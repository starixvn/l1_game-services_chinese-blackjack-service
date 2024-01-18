import { Core, Table } from "sc-game-base";
import { initAPIStub, stubUserService, subGameManagementService } from "sc-game-service-integration-utils";
import ContainerRegistry from "../../../src/container-registry";

import gameSettings from "./game-settings";
import { generateResult, settle } from "../../../src/helpers/dealer";
import { buildConfigs } from "./helper";

export const run = async (processId, overrideAppConfigs) => {
    const appConfigs = Object.assign({}, buildConfigs(processId), overrideAppConfigs);
    initAPIStub(appConfigs.apiSettings.apiUrl);
    const definition = new Table.TableGameDefinition(gameSettings, generateResult, settle, gameSettings.actions, gameSettings.payouts);
    const gameData = new Table.TableGameData(gameSettings.durations.wholeRound);
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
