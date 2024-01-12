import constants from "./../constants";

export const calculate = (cards = []) => {
    const handValues = cards.reduce(
        (total, card) => {
            const values = getValue(card, cards.length);
            const points = total.flatMap((acc) => values.map((val) => val + acc));

            return [...new Set(points)];
        },
        [0]
    );

    const maxValidPoint = handValues.find((val) => val <= constants.blackjack);
    const minPoint = handValues[handValues.length - 1];

    return [...new Set([maxValidPoint, minPoint])].filter((val) => val);
};

export const calculateFinalValue = (cards) => {
    const handValues = calculate(cards);

    const maxValidPoint = handValues.find((val) => val <= constants.blackjack);
    const minBustPoint = handValues[handValues.length - 1];

    return maxValidPoint || minBustPoint;
};

export const getCombinationRank = (cards) => {
    return (
        [
            {
                isValid: isDoubleA(cards),
                rank: constants.combinationRank.banBan,
            },
            {
                isValid: isBlackjack(cards),
                rank: constants.combinationRank.banLuck,
            },
            {
                isValid: isBust(cards),
                rank: constants.combinationRank.bust,
            },
            {
                isValid: isFiveCardTrick(cards),
                rank: constants.combinationRank.fiveCardTrick,
            },
        ].find((combination) => combination.isValid)?.rank ?? constants.combinationRank.regular
    );
};

const getValue = (card, numOfCards) => {
    switch (card.rank) {
        case "A":
            return numOfCards > 3 ? [1] : [...constants.aceValues];
        case "J":
        case "Q":
        case "K":
            return [constants.JQKValue];
        default:
            return [+card.rank];
    }
};

const isAce = (card) => card.rank === "A";

const isTenPoint = (card) => ["J", "Q", "K", "10"].includes(card.rank);

export const isDoubleA = (cards) => cards.length === 2 && isAce(cards[0]) && isAce(cards[1]);
export const isBlackjack = (cards) => cards.length === 2 && cards.some((card) => isAce(card) && cards.some((card) => isTenPoint(card)));

export const isFiveCardTrick = (cards) => cards.length === constants.maxCardsOnHand && calculateFinalValue(cards) <= constants.blackjack;

export const isBust = (cards) => calculate(cards)[0] > constants.blackjack;
