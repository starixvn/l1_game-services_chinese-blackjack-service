import { startService } from "./_stubs/test-jobs";
const path = require("path");
import { getProcessId, buildConfigs, initUserSession, checkConnect } from "./_stubs/helper";
import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptionsFunc } from "./_stubs/test-data";
import exp from "constants";

const scriptName = path.basename(__filename);
const processId = getProcessId(scriptName);
const overrideGameConfigs = { botenabled: false };
startService(processId, overrideGameConfigs);

const appConfigs = buildConfigs(processId);
const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("get provably fair", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    it("should return empty when round is not existing", async () => {
        //Arrange & Act
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        // Act
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        const inGameData = await client.handleGameEvent((data) => data.gameConfigs);
        console.log("ingame", inGameData);

        client.emit("getProvablyFair", { roundId: 1 });

        const provablyFair = await client.handleGameEvent((data) => data.provablyFair);
        console.log("provablyFair", provablyFair);

        // Assert
        expect(provablyFair).toEqual({ provablyFair: {} });
        client.close();
        //done();
    });

    it("should return empty when round hasn't finished", async () => {
        //Arrange & Act
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        // Act
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        const inGameData = await client.handleGameEvent((data) => data.gameConfigs);
        console.log("ingame", inGameData);

        client.emit("getProvablyFair", { roundId: 2 });

        const provablyFair = await client.handleGameEvent((data) => data.provablyFair);
        console.log("provablyFair", provablyFair);

        // Assert
        expect(provablyFair).toEqual({ provablyFair: {} });
        client.close();
        //done();
    });

    it("should return data when round IS finished", async () => {
        //Arrange & Act
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        // Act
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        const inGameData = await client.handleGameEvent((data) => data.gameConfigs);
        console.log("ingame", inGameData);

        client.emit(eventTypes.bet, { stand: { id: inGameData.ownBets.hands[0].id }, username: "NormalUser" });
        const standData = await client.handleGameEvent((data) => data.stand);
        console.log("stand", standData);

        const finishData = await client.handleGameEvent((data) => data.finish);
        console.log("finish", finishData);

        client.emit("getProvablyFair", { roundId: 2 });

        const provablyFair = await client.handleGameEvent((data) => data.provablyFair);
        console.log("provablyFair", provablyFair);

        // Assert
        expect(provablyFair).toEqual({
            provablyFair: {
                hash: "0b646dd45cf2c643ae51cf0e09c1881ec19f168cd29c9ba2668a4818be590aba",
                clientSeed: 3,
                serverSeed:
                    '{"deck":"9♣ 6♣ 4♣ 6♥ K♠ 4♠ 5♥ J♦ 9♥ 10♥ K♥ 10♠ 9♠ Q♥ Q♠ A♠ 7♠ 6♠ K♣ 2♥ 2♣ A♥ J♣ 4♠ 3♠ Q♣ 8♦ 7♦ K♠ 8♠ 2♣ 10♥ 9♦ 3♣ 6♣ K♦ 5♦ 5♣ K♥ 5♣ 5♦ 8♣ 10♦ 9♥ J♥ A♠ 3♥ J♣ 7♥ 8♦ 10♦ 10♣ 4♦ A♣ 8♥ 8♠ 3♦ Q♦ 3♥ 5♠ K♦ 7♠ 6♦ K♣ 6♦ 2♠ 3♣ A♦ Q♠ 10♣ 4♥ 9♠ J♦ 6♠ 7♥ 8♥ 7♣ Q♣ 4♦ 3♠ A♣ 5♠ 5♥ Q♦ J♠ 7♣ A♦ J♥ 4♥ 4♣ 6♥ 2♥ 8♣ 2♦ 2♦ J♠ Q♥ 2♠ 9♣ A♥ 7♦ 10♠ 9♦ 3♦","secret":"c059b745c20de880d3ffa"}',
                finalResult:
                    "6♥ K♠ 4♠ 5♥ J♦ 9♥ 10♥ K♥ 10♠ 9♠ Q♥ Q♠ A♠ 7♠ 6♠ K♣ 2♥ 2♣ A♥ J♣ 4♠ 3♠ Q♣ 8♦ 7♦ K♠ 8♠ 2♣ 10♥ 9♦ 3♣ 6♣ K♦ 5♦ 5♣ K♥ 5♣ 5♦ 8♣ 10♦ 9♥ J♥ A♠ 3♥ J♣ 7♥ 8♦ 10♦ 10♣ 4♦ A♣ 8♥ 8♠ 3♦ Q♦ 3♥ 5♠ K♦ 7♠ 6♦ K♣ 6♦ 2♠ 3♣ A♦ Q♠ 10♣ 4♥ 9♠ J♦ 6♠ 7♥ 8♥ 7♣ Q♣ 4♦ 3♠ A♣ 5♠ 5♥ Q♦ J♠ 7♣ A♦ J♥ 4♥ 4♣ 6♥ 2♥ 8♣ 2♦ 2♦ J♠ Q♥ 2♠ 9♣ A♥ 7♦ 10♠ 9♦ 3♦ 9♣ 6♣ 4♣",
            },
        });
        client.close();
        //done();
    });
});
