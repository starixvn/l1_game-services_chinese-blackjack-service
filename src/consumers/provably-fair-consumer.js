import { generateDecks } from "../helpers/deck-helper";
import crypto from "crypto";

export default class ProvablyFairConsumer {
    constructor(gameData, definition, roundResultPublisher, resultsRepository) {
        this.gameData = gameData;
        this.definition = definition;
        this.roundResultPublisher = roundResultPublisher;
        this.resultsRepository = resultsRepository;
    }

    generateNextResultAndPublish(playerId) {
        const { randomMode } = this.gameData.gameConfigs;
        this.gameData.nextResult[playerId] = generateDecks([], randomMode);
        this.gameData.serverSeed[playerId] = this.definition.generateRawResultForHash(
            this.gameData.nextResult[playerId],
            this.randomString()
        );
        this.gameData.hash[playerId] = this.createHash(this.gameData.serverSeed[playerId]);
        this.roundResultPublisher.publishResultHash(playerId, this.gameData.hash[playerId]);
    }

    async applyClientSeed(playerId, clientSeed) {
        this.gameData.clientSeed[playerId] = clientSeed;
        this.gameData.finalResult[playerId] = this.definition.applyClientSeed(this.gameData.nextResult[playerId], clientSeed);

        return this.gameData.finalResult[playerId];
    }

    async createResultRecord(playerId, roundId) {
        await this.resultsRepository.create({
            roundId: roundId,
            clientSeed: this.gameData.clientSeed[playerId],
            encryptedServerSeed: encrypt(this.gameData.serverSeed[playerId]),
            hash: this.gameData.hash[playerId],
            encryptedFinalResult: encrypt(JSON.stringify(this.gameData.finalResult[playerId])),
            time: this.getNewDate(),
        });
    }

    async readResultRecord() {}

    createHash(value) {
        return crypto.createHash("sha256").update(value).digest("hex");
    }

    randomString(length = 21) {
        return crypto.randomBytes(length).toString("hex").slice(0, length);
    }
}
