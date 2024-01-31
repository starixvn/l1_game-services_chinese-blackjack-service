import { calculateFinalValue, isBlackjack, isBust, isDoubleA, isFiveCardTrick } from "../src/helpers/card-helper";
import { generateDecks } from "../src/helpers/deck-helper";
import { settle, isUpCards, generateDealerCards } from "../src/helpers/dealer";

const odds = {
    banBan: 3,
    banLuck: 2,
    regular: 2,
    fiveCardTrick: 3,
};

function run({ totalRounds, randomMode, totalHand }) {
    const cardStatistic = {
        A: { count: 0, ratio: 0 },
        K: { count: 0, ratio: 0 },
        Q: { count: 0, ratio: 0 },
        J: { count: 0, ratio: 0 },
        2: { count: 0, ratio: 0 },
        3: { count: 0, ratio: 0 },
        4: { count: 0, ratio: 0 },
        5: { count: 0, ratio: 0 },
        6: { count: 0, ratio: 0 },
        7: { count: 0, ratio: 0 },
        8: { count: 0, ratio: 0 },
        9: { count: 0, ratio: 0 },
        10: { count: 0, ratio: 0 },
    };
    const blackJackStatistic = {
        player: [],
        dealer: {
            banban: {
                count: 0,
                ratio: 0,
            },
            banluck: {
                count: 0,
                ratio: 0,
            },
            bust: {
                count: 0,
                ratio: 0,
            },
            five: {
                count: 0,
                ratio: 0,
            },
        },
    };

    const { player, dealer } = blackJackStatistic;

    let rtp = 0;

    for (let index = 0; index < totalRounds; index++) {
        const desk = generateDecks([], randomMode);

        const playerCards = [];

        for (let handIndex = 0; handIndex < totalHand; handIndex++) {
            player[handIndex] = player[handIndex] ?? {
                banban: {
                    count: 0,
                    ratio: 0,
                },
                banluck: {
                    count: 0,
                    ratio: 0,
                },
                bust: {
                    count: 0,
                    ratio: 0,
                },
                five: {
                    count: 0,
                    ratio: 0,
                },
            };

            playerCards[handIndex] = [desk.shift(), desk.shift()];

            isBlackjack(playerCards[handIndex]) && player[handIndex].banluck.count++;
            isDoubleA(playerCards[handIndex]) && player[handIndex].banban.count++;

            while (playerCards[handIndex].length < 5 && playerHit(playerCards[handIndex])) {
                playerCards[handIndex].push(desk.shift());
            }

            isBust(playerCards[handIndex]) && player[handIndex].bust.count++;
            isFiveCardTrick(playerCards[handIndex]) && player[handIndex].five.count++;
        }

        let dealerCards = [desk.shift(), desk.shift()];

        isBlackjack(dealerCards) && dealer.banluck.count++;
        isDoubleA(dealerCards) && dealer.banban.count++;

        const isUp = isUpCards(
            playerCards.map((cards) => {
                return {
                    cards: cards,
                };
            })
        );

        const { result } = generateDealerCards(dealerCards, desk, isUp, []);
        dealerCards = result;

        isBust(dealerCards) && dealer.bust.count++;
        isFiveCardTrick(dealerCards) && dealer.five.count++;

        playerCards.forEach((hand) => {
            //if (!isBust(hand)) {
            const rs = settle(dealerCards, { cards: hand }, odds);

            rtp += rs;
            //}
        });
    }

    dealer.banluck.ratio = dealer.banluck.count / totalRounds;
    dealer.banban.ratio = dealer.banban.count / totalRounds;
    dealer.bust.ratio = dealer.bust.count / totalRounds;
    dealer.five.ratio = dealer.five.count / totalRounds;

    Object.values(cardStatistic).forEach((cardStat) => {
        cardStat.ratio = cardStat.count / totalRounds / (player.length * 2 + 2);
    });
    player.forEach((hand) => {
        hand.banluck.ratio = hand.banluck.count / totalRounds;
        hand.banban.ratio = hand.banban.count / totalRounds;
        hand.bust.ratio = hand.bust.count / totalRounds;
        hand.five.ratio = hand.five.count / totalRounds;
    });

    console.log(`======== Run ${totalRounds} rounds ========`);
    console.log((rtp / (totalRounds * totalHand)) * 100);
    console.log(JSON.stringify(blackJackStatistic, undefined, 2));
}

function playerHit(playerCards) {
    const score = calculateFinalValue(playerCards);
    const hasA = playerCards.find((card) => card.rank === "A");

    const condition1 = score >= 16 && score <= 17 && hasA;
    //condition1 && console.log(playerCards);

    return score < 16 || condition1;
}

run({ totalRounds: 100000, randomMode: 1, totalHand: 1 });
