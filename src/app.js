import { Core } from "sc-game-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { generateResult, settle, generateRawResultForHash } from "./helpers/dealer";
import ContainerRegistry from "./container-registry";
import GameData from "./game-data";
import GameDefinition from "./game-definition";

const run = async () => {
    const gameData = new GameData(gameSettings.durations.wholeRound);

    const definition = new GameDefinition(
        gameSettings,
        generateResult,
        settle,
        generateRawResultForHash,
        gameSettings.actions,
        gameSettings.payouts
    );

    const container = new ContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(definition.name, appConfigs);

    await app.run();
    await app.startGame(container);
};

run();
