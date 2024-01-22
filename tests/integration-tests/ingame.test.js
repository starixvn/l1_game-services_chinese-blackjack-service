import { startService } from "./_stubs/test-jobs";
const path = require("path");
import { getProcessId, buildConfigs, initUserSession, checkConnect } from "./_stubs/helper";
import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptionsFunc } from "./_stubs/test-data";

const scriptName = path.basename(__filename);
const processId = getProcessId(scriptName);
const overrideGameConfigs = { botenabled: false };
startService(processId, overrideGameConfigs);

const appConfigs = buildConfigs(processId);
const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("ingame", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    it("should receive hash value", async () => {
        //Arrange & Act
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        // Act
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        const inGameData = await client.handleGameEvent((data) => data.gameConfigs);
        console.log("ingame", inGameData);

        const hashData = await client.handleGameEvent((data) => data.resultHash);
        console.log("hashData", hashData);

        client.close();

        // Assert
        //done();
    });
});
