export default {
    id: 77,
    name: "ChineseBlackjack",
    durations: {
        wholeAction: 60,
        wholeRound: 60,
        botFrequency: 5,
    },
    actions: {
        stand: "stand",
        hit: "hit",
        deal: "deal",
    },
    payouts: {
        banBan: "doubleA",
        banLuck: "blackjack",
        fiveCardTrick: "fiveCardTrick",
        regular: "regular",
    },
};
