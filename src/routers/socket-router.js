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
}
