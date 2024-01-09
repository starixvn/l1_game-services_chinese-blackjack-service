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

    const compareRank = dealer.rank - player.rank;
    const compareValue = player.val - dealer.val;

    let winLoss = compareRank;

    if (compareRank == 0) {
        winLoss = compareValue;

        if (player.rank == constants.combinationRank.fiveCardTrick) {
            winLoss = -compareValue;
        }

        if (player.rank == constants.combinationRank.bust) {
            if (player.val > constants.maxPlayerBustPoint) {
                winLoss = -1;
            } else {
                winLoss = 0;
            }
        }
    }

    if (winLoss > 0) {
        const combinationKey = Object.keys(constants.combinationRank).find((key) => constants.combinationRank[key] === player.rank);
        return odds[combinationKey];
    }

    if (winLoss == 0) {
        return 1;
    }

    return 0;
};

export const isUpCards = (hands) => {
    const blackjackCount = hands.filter((hand) => isBlackjack(hand.cards) || isDoubleA(hand.cards)).length;
    const bustCount = hands.filter((hand) => isBust(hand.cards)).length;

    return blackjackCount + bustCount === hands.length;
};
