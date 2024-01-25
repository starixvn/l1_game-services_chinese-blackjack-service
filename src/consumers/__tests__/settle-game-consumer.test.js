import { gameNotifications } from "sc-base-database";
import gameSettings from "../../game-settings";
import { generateResult, isUpCards, settle, generateDealerCards, generateRawResultForHash } from "../../helpers/dealer";
import { generateDecks } from "../../helpers/deck-helper";
import GameData from "../../game-data";
import GameDefinition from "../../game-definition";
import RoundResultPublisher from "../../publishers/round-result-publisher";
import SettleGameConsumer from "../settle-game-consumer";
jest.mock("../../publishers/round-result-publisher");
jest.mock("sc-base-database");

/** @type {GameDefinition}*/
let definition = null;
/** @type {GameData}*/
let gameData = null;
const roundResultPublisher = new RoundResultPublisher();

const roundsRepositoryExecMockFunc = jest.fn();
/** @type {mongoose.Model}*/
const roundsRepository = {
    findOne: () => ({
        lean: () => ({
            exec: roundsRepositoryExecMockFunc,
        }),
    }),
    updateOne: jest.fn(),
};

const betsRepositoryExecMockFunc = jest.fn();
/** @type {mongoose.Model}*/
const betsRepository = {
    find: () => ({
        exec: betsRepositoryExecMockFunc,
    }),
};

/** @type {SettleGameConsumer}*/
let consumer = null;

const endGame = jest.fn();
endGame.mockReturnValue({ isOk: true });

beforeEach(() => {
    definition = new GameDefinition(
        gameSettings,
        generateResult,
        settle,
        generateRawResultForHash,
        jest.fn(),
        gameSettings.actions,
        gameSettings.payouts
    );
    gameData = new GameData(gameSettings.durations.wholeRound);
    gameData.gameConfigs = {
        enabled: true,
        minbet: 1,
        maxbet: 3000,
        disabledround: 6912,
        odds: {
            regular: 2,
            banBan: 2.5,
            banLuck: 2.5,
        },
    };

    consumer = new SettleGameConsumer({ definition, gameData, roundResultPublisher, endGame, roundsRepository, betsRepository });
});

describe("settle round tests", () => {
    it("should delete ingame, publish round result delete data in game notification", async () => {
        const deck = generateDecks();
        const betTracks = {
            uid: 1,
            roundId: 1,
            hands: [
                {
                    id: 100,
                    bet: 100,
                    cards: [
                        {
                            rank: "10",
                            suit: 0,
                        },
                        {
                            rank: "J",
                            suit: 0,
                        },
                    ],
                    actions: [gameSettings.actions.stand],
                },
            ],
            deck,
            dealer: {
                cards: [
                    { rank: "10", suit: 1 },
                    { rank: "7", suit: 1 },
                ],
            },
        };
        gameData.ingame["player"] = {
            betTracks,
        };

        roundsRepositoryExecMockFunc.mockReturnValueOnce({ id: 1, odds: gameData.gameConfigs.odds });
        betsRepositoryExecMockFunc.mockReturnValueOnce([
            {
                id: 100,
                roundId: 1,
                bet: 100,
                cards: [
                    {
                        rank: "10",
                        suit: 0,
                    },
                    {
                        rank: "J",
                        suit: 0,
                    },
                ],
                actions: [gameSettings.actions.stand],
                save: jest.fn(),
            },
        ]);

        consumer.provablyFairConsumer = {
            generateNextResultAndPublish: jest.fn(),
        };
        await consumer.settleRound("player");
        expect(roundResultPublisher.publishRoundResult).toHaveBeenCalled();
        expect(gameData.ingame["player"]).toBeUndefined();
        expect(gameNotifications.deleteOne).toHaveBeenCalled();
    });
});

describe("settle bet tests", () => {
    it("should delete ingame, publish round result", async () => {
        const deck = generateDecks();
        const betTracks = {
            uid: 1,
            roundId: 1,
            hands: [
                {
                    id: 100,
                    bet: 100,
                    cards: [
                        {
                            rank: "10",
                            suit: 0,
                        },
                        {
                            rank: "J",
                            suit: 0,
                        },
                    ],
                    actions: [gameSettings.actions.stand],
                },
            ],
            deck,
            dealer: {
                cards: [
                    { rank: "10", suit: 1 },
                    { rank: "7", suit: 1 },
                ],
            },
        };
        gameData.ingame["player"] = {
            betTracks,
        };

        const { result, settlementResult } = generateDealerCards(betTracks.dealer.cards, betTracks.deck, isUpCards(betTracks.hands));

        const finish = {
            settlementResult,
            result,
            roundId: betTracks.roundId,
            time: new Date(),
        };

        betsRepositoryExecMockFunc.mockReturnValueOnce([
            {
                id: 100,
                roundId: 1,
                bet: 100,
                cards: [
                    {
                        rank: "10",
                        suit: 0,
                    },
                    {
                        rank: "J",
                        suit: 0,
                    },
                ],
                actions: [],
                save: jest.fn(),
            },
        ]);

        await consumer.settleBets({ ...finish, playerName: "player", playerUID: betTracks.uid });
        expect(roundResultPublisher.publishRoundResult).toHaveBeenCalledWith({
            playerId: betTracks.uid,
            result: {
                result,
                settlementResult,
                winningHands: [{ id: 100, betwin: 200 }],
            },
        });
        expect(gameData.ingame["player"]).toBeUndefined();
    });
});
