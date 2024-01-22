import { Core, Table } from "sc-game-base";
import { initAPIStub, stubUserService, subGameManagementService } from "sc-game-service-integration-utils";
import ContainerRegistry from "../../../src/container-registry";
import GameDefinition from "../../../src/game-definition";
import GameData from "../../../src/game-data";
import gameSettings from "./game-settings";
import { generateResult, settle, generateRawResultForHash } from "../../../src/helpers/dealer";
import { buildConfigs } from "./helper";

export const run = async (processId, overrideAppConfigs) => {
    const appConfigs = Object.assign({}, buildConfigs(processId), overrideAppConfigs);
    initAPIStub(appConfigs.apiSettings.apiUrl);
    const definition = new GameDefinition(
        gameSettings,
        generateResult,
        settle,
        generateRawResultForHash,
        gameSettings.actions,
        gameSettings.payouts
    );

    const gameData = new GameData(gameSettings.durations.wholeRound);
    stubUserService(appConfigs);
    subGameManagementService(appConfigs, definition);
    const container = new ContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(gameSettings.name, appConfigs);
    await app.run();
    await app.startGame(container);
};

const processId = process.argv[3];
const overrideAppConfigs = JSON.parse(process.argv[4]);
run(processId, overrideAppConfigs);
