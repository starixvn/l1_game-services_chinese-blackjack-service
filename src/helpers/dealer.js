import { cards } from "../card";
import constants from "./../constants";
import { calculateFinalValue, isBlackjack, getCombinationRank, isDoubleA, isBust, isUnqualified } from "./card-helper";

export const generateResult = (dealerCards, decks, isUpCard, preGeneratedCards = []) => {
    if (isUpCard) {
        return { result: dealerCards, settlementResult: calculateFinalValue(dealerCards) };
    }

    while (dealerCards.length < constants.maxCardsOnHand && calculateFinalValue(dealerCards) < constants.minDealerPoint) {
        dealerCards.push(preGeneratedCards.shift() ?? decks.shift());
    }

    return { result: dealerCards, settlementResult: calculateFinalValue(dealerCards) };
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

    let winLoss = calculateWinLoss(player, dealer);

    if (winLoss > 0) {
        const combinationKey = Object.keys(constants.combinationRank).find((key) => constants.combinationRank[key] === player.rank);
        return odds[combinationKey];
    }

    return winLoss == 0 ? 1 : 0;
};

const calculateWinLoss = (player, dealer) => {
    const compareRank = dealer.rank - player.rank;
    const compareValue = player.val - dealer.val;

    let winLoss = compareRank;

    if (player.rank == constants.combinationRank.bust) {
        return -1;
    }

    if (compareRank == 0) {
        winLoss = compareValue;

        if (player.rank == constants.combinationRank.fiveCardTrick) {
            winLoss = -compareValue;
        }
    }

    return winLoss;
};

export const isUpCards = (hands) => {
    const totalUpHand = hands.filter(
        (hand) => isBlackjack(hand.cards) || isDoubleA(hand.cards) || isBust(hand.cards) || isUnqualified(hand.cards)
    ).length;

    return totalUpHand === hands.length;
};
