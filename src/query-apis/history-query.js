import { Core } from "sc-game-base";
import { encrypt, decrypt } from "sc-game-base/src/core/helpers/crypto-helper";
import { formatResult } from "../helpers/dealer";

export default class HistoryQuery extends Core.QueryApis.HistoryQuery {
    constructor(roundQuery, betsRepository, betLogsRepository, resultsRepository, roundsRepository) {
        super(roundQuery, betsRepository, betLogsRepository);
        this.resultsRepository = resultsRepository;
        this.roundsRepository = roundsRepository;
    }

    async queryHistory(player, page, pageSize = 8) {
        if (page < 1 || !player) {
            return {};
        }

        const filter = { uid: player.UID, paid: true };
        const numberOfSkippedBets = (page - 1) * pageSize;
        const total = await this.betsRepository.countDocuments(filter).exec();
        const betProjection = {
            _id: false,
            uid: false,
            paid: false,
            odds: false,
            siteId: false,
            playerId: false,
            __v: false,
            __archive: false,
            currency: false,
            operatorId: false,
        };
        const bets = await this.betsRepository
            .find(filter, betProjection, { sort: { id: -1 }, skip: numberOfSkippedBets, limit: pageSize })
            .lean()
            .exec();
        let betLogs = [];

        if (bets && bets.length > 0) {
            betLogs = await Promise.all(
                bets.map(async (bet) => {
                    const round = await this.roundQuery.getOne(bet.roundId, { _id: false });

                    return {
                        ...bet,
                        result: round.ended ? round.result : [round.result[0]],
                        settlementResult: round.settlementResult,
                        ended: round.ended,
                    };
                })
            );
        }

        return { history: { betLogs, page, pageSize, total } };
    }

    async queryProvablyFair(player, roundId) {
        let provablyFair = {};
        const round = await this.roundsRepository.findOne({ id: roundId, uid: player.UID, ended: true }).lean().exec();
        if (round) {
            const resultRecord = await this.resultsRepository.findOne({ roundId: roundId }).lean().exec();
            if (resultRecord) {
                provablyFair = {
                    hash: resultRecord.hash,
                    clientSeed: resultRecord.clientSeed,
                    serverSeed: decrypt(resultRecord.encryptedServerSeed),
                    finalResult: formatResult(JSON.parse(decrypt(resultRecord.encryptedFinalResult))),
                };
            }
        }

        return { provablyFair };
    }
}
