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
        this.gameData.nextResultHash[playerId] = this.buildResultHash(this.gameData.nextResult[playerId]);
        this.roundResultPublisher.publishResultHash(playerId, this.gameData.nextResultHash[playerId].hashValue);
    }

    async applyClientSeed(playerId, clientSeed) {
        const nextResult = this.gameData.nextResult[playerId];
        this.gameData.clientSeed[playerId] = clientSeed;
        this.gameData.result[playerId] = nextResult; // to do: apply client seed
        await this.createResultRecord();
        return this.gameData.result[playerId];
    }

    async createResultRecord() {}

    async readResultRecord() {}

    buildResultHash(result) {
        const formattedResult = this.definition.generateRawResultForHash(result);

        return this.generateMD5Result(formattedResult);
    }

    generateMD5Result(formattedResult) {
        const formattedResultWithSalt = `${formattedResult}_${this.randomString()}}`;
        return { hashValue: this.createHashMD5(formattedResultWithSalt), rawValue: formattedResultWithSalt };
    }

    createHashMD5(value) {
        return crypto.createHash("md5").update(value).digest("hex");
    }

    randomString(length = 21) {
        return crypto.randomBytes(length).toString("hex").slice(0, length);
    }
}
