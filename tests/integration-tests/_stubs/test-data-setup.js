import mongoose from "mongoose";
import { users } from "sc-base-database";
import { middlewares } from "sc-common";
import {
    createCurrencyGroupGames,
    createDummyCurrency,
    createDummyUsers,
    createExchangeRate,
    createGameConfig,
    createPartnerConfig,
    normalUser,
} from "sc-game-service-integration-utils";

import { bets, rounds, results } from "../../../src/models";
import { currencyData, game, gameConfig, userRoundsData, userBetData, promotions, resultsData } from "./test-data";
import { Core } from "sc-game-base";
import { buildConfigs } from "./helper";

const connectDatabase = async (processId) => {
    const appConfigs = buildConfigs(processId);
    await middlewares.database.configureDatabase(mongoose, appConfigs.database);

    await clearAllData();
};

const clearAllData = async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.remove();
    }
};

export const createTestData = async (processId, overrideGameConfigs) => {
    const finalGameConfig = Object.assign({}, gameConfig, overrideGameConfigs);
    await connectDatabase(processId);
    await createExchangeRate();
    await createGameConfig(finalGameConfig);
    const partnerConfig = await createPartnerConfig(game.id);

    const currency = await createDummyCurrency(partnerConfig.partnerId, currencyData.code, currencyData.name);
    await createCurrencyGroupGames(currency.groupId, game.id, finalGameConfig);
    await createDummyUsers(currency);
    await createRounds();
    await createUserBetData();
    await createPromotionData();
    await createResult();

    console.log("Create exchange rate, game config & dummy user for testing successfully!");
    process.exit(0);
};

const getUserId = async (playerId) => {
    const user = await users.findOne({ "local.playerId": playerId }, { _id: true }).lean();
    return user._id.toString();
};

const createRounds = async () => {
    const userId = await getUserId(normalUser.playerId);
    const roundsData = userRoundsData(userId);
    return rounds.insertMany(roundsData);
};

const createUserBetData = async () => {
    const userId = await getUserId(normalUser.playerId);
    const betData = userBetData(userId);
    return bets.insertMany(betData);
};

const createPromotionData = async () => {
    await Core.Models.Promotions.insertMany(promotions);
};

const createResult = async () => {
    await results.insertMany(resultsData);
};

const processId = process.argv[3];
const overrideGameConfigs = JSON.parse(process.argv[4]);
createTestData(processId, overrideGameConfigs);
