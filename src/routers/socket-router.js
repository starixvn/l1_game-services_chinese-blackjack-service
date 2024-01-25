import { logger } from "sc-common";
import { Core } from "sc-game-base";

import GameData from "../game-data";
import GameDefinition from "../game-definition";

export default class SocketRouter extends Core.Routers.BaseSocketRouter {
    /**
     * @param {GameDefinition} definition
     * @param {GameData} gameData
     */
    constructor({
        definition,
        gameData,
        userSignInConsumer,
        inGameConsumer,
        placeBetConsumer,
        userDisconnectConsumer,
        userSignInPublisher,
        historyQuery,
        logService,
        userStandConsumer,
        userHitConsumer,
        userDealConsumer,
        playGamePermissionValidator,
    }) {
        super({
            definition,
            gameData,
            userSignInConsumer,
            inGameConsumer,
            placeBetConsumer,
            userDisconnectConsumer,
            userSignInPublisher,
            historyQuery,
            logService,
            playGamePermissionValidator,
        });

        this.userStandConsumer = userStandConsumer;
        this.userHitConsumer = userHitConsumer;
        this.userDealConsumer = userDealConsumer;
    }

    init(socketClient) {
        super.init(socketClient);
        this.socketClient.on("getProvablyFair", this.getProvablyFair.bind(this));
    }

    async handlePlaceBet(payload) {
        try {
            if (!this.verify()) {
                return;
            }

            if (payload.deal) {
                await this.userDealConsumer.consume(this.gameData.realPlayers[this.socketClient.id], payload);
                return;
            }

            if (payload.hit) {
                await this.userHitConsumer.consume(this.gameData.realPlayers[this.socketClient.id], payload);
                return;
            }

            if (payload.stand) {
                await this.userStandConsumer.consume(this.gameData.realPlayers[this.socketClient.id], payload);
                return;
            }
        } catch (error) {
            logger.logError(error);
        }
    }

    async getProvablyFair(payload) {
        try {
            if (!this.verify()) {
                return;
            }

            const provablyFair = await this.historyQuery.queryProvablyFair(
                this.gameData.realPlayers[this.socketClient.id],
                payload.roundId
            );

            this.socketClient.emit(this.definition.name, provablyFair);
        } catch (error) {
            this.logService.logError(error);
        }
    }
}
