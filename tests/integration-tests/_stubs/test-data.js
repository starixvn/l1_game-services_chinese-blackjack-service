import gameSetting from "../../../src/game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    odds: {
        regular: 2,
        banBan: 3,
        banLuck: 2,
        fiveCardTrick: 3,
    },
    botenabled: true,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
};

const roundsData = [
    {
        result: [
            {
                rank: "9",
                suit: 2,
            },
            {
                rank: "4",
                suit: 1,
            },
            {
                rank: "8",
                suit: 0,
            },
        ],
        ended: true,
        id: 1,
        uid: "61b83e7626ecc9208bce39bd",
        name: "DavidIvenV3",
        odds: {
            regular: 2,
            fiveCardTrick: 3,
            banBan: 3,
            banLuck: 2,
        },
        exchangeRateId: 1,
        __v: 0,
        settlementResult: 21,
    },
    {
        result: [
            {
                rank: "7",
                suit: 2,
            },
            {
                rank: "A",
                suit: 2,
            },
        ],
        ended: true,
        id: 2,
        uid: "61b83e7626ecc9208bce39bd",
        name: "DavidIvenV3",
        odds: {
            regular: 2,
            fiveCardTrick: 3,
            banBan: 3,
            banLuck: 2,
        },
        exchangeRateId: 1,
        __v: 0,
        settlementResult: 18,
    },
];

const userBetData = (uid) => {
    return [
        {
            id: 48,
            pos: 1,
            actions: ["stand"],
            cards: [
                {
                    rank: "A",
                    suit: 2,
                },
                {
                    rank: "7",
                    suit: 0,
                },
            ],
            total: 18,
            softPoints: [],
            bet: 1,
            betwin: 0,
            freeBet: false,
            roundId: 1,
            paid: true,
            uid: uid,
            name: "NormalUser",
            siteId: "111",
            currency: "$US",
            playerId: 1,
            operatorId: "dummy-operator-id",
            rate: 1,
        },
        {
            id: 47,
            pos: 2,
            actions: ["stand"],
            cards: [
                {
                    rank: "Q",
                    suit: 2,
                },
                {
                    rank: "5",
                    suit: 0,
                },
            ],
            total: 15,
            softPoints: [],
            bet: 1,
            betwin: 0,
            freeBet: false,
            roundId: 2,
            paid: true,
            uid: uid,
            name: "NormalUser",
            siteId: "111",
            currency: "$US",
            playerId: 1,
            operatorId: "dummy-operator-id",
            rate: 1,
        },
    ];
};

const userBetLogData = (uid) => {
    return [];
};

const promotions = [];

export { game, currencyData, socketOptionsFunc, gameConfig, roundsData, userBetData, promotions, userBetLogData };
