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

describe("signin", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    it("should place bet on running round successfully", async () => {
        //Arrange & Act
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        // Act
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        const inGameData = await client.handleGameEvent((data) => data.gameConfigs);
        console.log("ingame", JSON.stringify(inGameData));

        //client.emit(eventTypes.bet, { deal: { hands: [{ pos: 2, bet: 1 }], clientSeed: 12 }, username: "NormalUser" });

        //const dealData = await client.handleGameEvent((data) => data.deal);
        //console.log("deal", dealData, dealData.deal.hands[0].id);

        client.emit(eventTypes.bet, { stand: { id: inGameData.ownBets.hands[0].id }, username: "NormalUser" });
        const standData = await client.handleGameEvent((data) => data.stand);
        console.log("stand", standData);

        const finishData = await client.handleGameEvent((data) => data.finish);
        console.log("finish", finishData);

        client.close();

        // Assert
        //done();
    });

    it("should place bet on new round successfully", async () => {
        //Arrange & Act
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        // Act
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        const inGameData = await client.handleGameEvent((data) => data.gameConfigs);
        console.log("ingame", inGameData);

        client.emit(eventTypes.bet, { deal: { hands: [{ pos: 2, bet: 1 }], clientSeed: 12 }, username: "NormalUser" });

        const dealData = await client.handleGameEvent((data) => data.deal);
        console.log("deal", dealData, dealData.deal.hands[0].id);

        client.emit(eventTypes.bet, { stand: { id: dealData.deal.hands[0].id }, username: "NormalUser" });
        const standData = await client.handleGameEvent((data) => data.stand);
        console.log("stand", standData);

        const finishData = await client.handleGameEvent((data) => data.finish);
        console.log("finish", finishData);

        client.close();

        // Assert
        //done();
    });
});
