import constants from "./../constants";
import { calculate, calculateFinalValue, isBust, isBlackjack, getCombinationRank, isDoubleA } from "./card-helper";

export const generateResult = (dealerCards, decks, isUpCard, preGeneratedCards = []) => {
    if (isUpCard) {
        return { result: dealerCards, settlementResult: calculateFinalValue(dealerCards) };
    }

    let points = calculate(dealerCards);

    while (
        ((points.at(-1) < constants.minDealerPoint && points.length === 1) ||
            (points.length > 1 && points.at(-1) < constants.minDealerSoftPoint)) &&
        dealerCards.length < constants.maxCardsOnHand
    ) {
        dealerCards.push(preGeneratedCards.shift() ?? decks.shift());
        points = calculate(dealerCards);
    }

    return { result: dealerCards, settlementResult: points.at(-1) };
};

export const settle = (dealerCards, bet, odds) => {
    const player = {
        rank: getCombinationRank(bet.cards),
        val: calculateFinalValue(bet.cards),
    };

    const dealer = {
        rank: getCombinationRank(dealerCards),
        val: calculateFinalValue(dealerCards),
    };

    let winLoss = 0;

    if (player.rank < dealer.rank) {
        winLoss = -1;
    }

    if (player.rank > dealer.rank) {
        winLoss = 1;
    }

    if (player.rank === dealer.rank) {
        if (player.rank == constants.combinationRank.fiveCardTricks && player.val < dealer.val) {
            winLoss = 1;
        }

        if (player.rank === constants.combinationRank.bust && player.val > constants.maxPlayerBustPoint) {
            winLoss = -1;
        }
    }

    switch (winLoss) {
        case 0:
            return 1;
        case 1:
            const combinationKey = Object.keys(constants.combinationRank).find((key) => constants.combinationRank[key] === player.rank);
            return odds[combinationKey];
        case -1:
            return 0;
    }
};

export const isUpCards = (hands) => {
    const blackjackCount = hands.filter((hand) => isBlackjack(hand.cards) || isDoubleA(hand.cards)).length;
    const bustCount = hands.filter((hand) => isBust(hand.cards)).length;

    return blackjackCount + bustCount === hands.length;
};
