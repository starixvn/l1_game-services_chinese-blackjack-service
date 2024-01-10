import constants from "./../constants";
import { calculateFinalValue, isBust, isBlackjack, getCombinationRank, isDoubleA } from "./card-helper";

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

    if (player.val < constants.minPlayerPoint) {
        return 0;
    }

    let winLoss = calculateWinLoss(player, dealer);

    if (winLoss > 0) {
        const combinationKey = Object.keys(constants.combinationRank).find((key) => constants.combinationRank[key] === player.rank);
        return odds[combinationKey];
    }

    if (winLoss == 0) {
        return 1;
    }

    return 0;
};

const calculateWinLoss = (player, dealer) => {
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

    return winLoss;
};

export const isUpCards = (hands) => {
    const blackjackCount = hands.filter((hand) => isBlackjack(hand.cards) || isDoubleA(hand.cards)).length;

    return blackjackCount === hands.length;
};
