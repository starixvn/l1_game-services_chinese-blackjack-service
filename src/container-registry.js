import awilix from "awilix";
import { Table } from "sc-game-base";
import { InGameConsumer, OutGameConsumer, UserDealConsumer, UserHitConsumer, UserStandConsumer, ProvablyFairConsumer } from "./consumers";
import SettleGameConsumer from "./consumers/settle-game-consumer";
import GameCron from "./crons/game-cron";
import PontoonBot from "./crons/bot";
import PontoonProcessBetQueue from "./crons/process-bet-queue";

import { gameNotifications } from "sc-base-database";
import { ChineseBlackjackBets } from "./models/chinese-blackjack-bets";
import { ChineseBlackjackRounds } from "./models/chinese-blackjack-rounds";
import { ChineseBlackjackResults } from "./models/chinese-blackjack-results";
import RoundResultPublisher from "./publishers/round-result-publisher";
import HistoryQuery from "./query-apis/history-query";
import HttpRouter from "./routers/http-router";
import SocketRouter from "./routers/socket-router";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(ChineseBlackjackRounds),
            betsRepository: asValue(ChineseBlackjackBets),
            gameNotificationsRepository: asValue(gameNotifications),
            resultsRepository: asValue(ChineseBlackjackResults),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            settleGameRoundConsumer: asClass(SettleGameConsumer).singleton().proxy(),
            userStandConsumer: asClass(UserStandConsumer).singleton(),
            userHitConsumer: asClass(UserHitConsumer).singleton(),
            userDealConsumer: asClass(UserDealConsumer).singleton(),
            inGameConsumer: asClass(InGameConsumer).singleton(),
            userDisconnectConsumer: asClass(OutGameConsumer).singleton(),
            provablyFairConsumer: asClass(ProvablyFairConsumer).singleton(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            roundResultPublisher: asClass(RoundResultPublisher).singleton(),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            socketRouter: asClass(SocketRouter).proxy(),
            httpRouter: asClass(HttpRouter),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            processBetQueue: asClass(PontoonProcessBetQueue).singleton().proxy(),
            gameCron: asClass(GameCron).singleton().proxy(),
            bot: asClass(PontoonBot).singleton(),
        });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            historyQuery: asClass(HistoryQuery).singleton(),
        });
    }
}
