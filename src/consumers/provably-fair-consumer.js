import crypto from "crypto";
import { encrypt, decrypt } from "sc-game-base/src/core/helpers/crypto-helper";

export default class ProvablyFairConsumer {
    constructor(gameData, definition, roundResultPublisher, resultsRepository) {
        this.gameData = gameData;
        this.definition = definition;
        this.roundResultPublisher = roundResultPublisher;
        this.resultsRepository = resultsRepository;
    }

    generateNextResultAndPublish(playerId, playerName) {
        let provablyFair = this.gameData.provablyFair[playerName];
        if (!provablyFair) {
            provablyFair = {};
            provablyFair.nextResult = this.definition.generateResult(this.gameData.gameConfigs.randomMode);
            provablyFair.serverSeed = this.definition.generateRawResultForHash(provablyFair.nextResult, this.randomString());
            provablyFair.hash = this.createHash(provablyFair.serverSeed);

            this.gameData.provablyFair[playerName] = provablyFair;
        }

        this.roundResultPublisher.publishResultHash(playerId, provablyFair.hash);
    }

    applyClientSeed(playerName, clientSeed) {
        const provablyFair = this.gameData.provablyFair[playerName];
        provablyFair.clientSeed = clientSeed || 0;
        provablyFair.finalResult = this.definition.applyClientSeed(provablyFair.nextResult, clientSeed);

        return JSON.parse(JSON.stringify(provablyFair.finalResult));
    }

    async createResultRecord(playerName, roundId) {
        const record = await this.findResultRecord(roundId);
        if (!record) {
            const provablyFair = this.gameData.provablyFair[playerName];
            await this.resultsRepository.create({
                roundId: roundId,
                clientSeed: provablyFair.clientSeed,
                encryptedServerSeed: encrypt(provablyFair.serverSeed),
                hash: provablyFair.hash,
                encryptedFinalResult: encrypt(JSON.stringify(provablyFair.finalResult)),
                time: this.getNewDate(),
            });
        }
    }

    async readResultRecord(playerName, roundId) {
        const record = await this.findResultRecord(roundId);
        const provablyFair = {
            hash: record.hash,
            clientSeed: record.clientSeed,
            finalResult: JSON.parse(decrypt(record.encryptedFinalResult)),
        };
        this.gameData.provablyFair[playerName] = provablyFair;

        return provablyFair.finalResult;
    }

    async findResultRecord(roundId) {
        return await this.resultsRepository.findOne({ roundId: roundId }).lean().exec();
    }

    createHash(value) {
        return crypto.createHash("sha256").update(value).digest("hex");
    }

    randomString(length = 21) {
        return crypto.randomBytes(length).toString("hex").slice(0, length);
    }

    getNewDate() {
        return new Date();
    }
}
