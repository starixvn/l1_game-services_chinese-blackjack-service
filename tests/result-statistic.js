import { calculateFinalValue, isBlackjack, isBust, isDoubleA } from "../src/helpers/card-helper";
import { generateDecks } from "../src/helpers/deck-helper";
import { settle } from "../src/helpers/dealer";
import constants from "../src/constants";

const odds = {
    banBan: 4,
    banLuck: 3,
    regular: 2,
    fiveCardTrick: 4,
};

function run() {
    const totalRounds = 1_000_000;
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
        },
    };

    const { player, dealer } = blackJackStatistic;

    const totalHand = 3;
    const randomMode = 3;

    let rtp = -(totalRounds * totalHand);

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
            };

            playerCards[handIndex] = [desk.shift(), desk.shift()];

            isBlackjack(playerCards[handIndex]) && player[handIndex].banluck.count++;
            isDoubleA(playerCards[handIndex]) && player[handIndex].banban.count++;

            while (playerCards[handIndex].length < 5 && calculateFinalValue(playerCards[handIndex]) < constants.minPlayerPoint) {
                playerCards[handIndex].push(desk.shift());
            }

            isBust(playerCards[handIndex]) && player[handIndex].bust.count++;
        }

        const dealerCards = [desk.shift(), desk.shift()];

        isBlackjack(dealerCards) && dealer.banluck.count++;
        isDoubleA(dealerCards) && dealer.banban.count++;

        while (dealerCards.length < 5 && calculateFinalValue(dealerCards) < constants.minDealerPoint) {
            dealerCards.push(desk.shift());
        }

        isBust(dealerCards) && dealer.bust.count++;

        playerCards.forEach((hand) => {
            const rs = settle(dealerCards, { cards: hand }, odds);

            if (isNaN(rs)) {
                console.log(rs);
            }

            rtp += rs;
        });
    }

    dealer.banluck.ratio = dealer.banluck.count / totalRounds;
    dealer.banban.ratio = dealer.banban.count / totalRounds;
    dealer.bust.ratio = dealer.bust.count / totalRounds;

    Object.values(cardStatistic).forEach((cardStat) => {
        cardStat.ratio = cardStat.count / totalRounds / (player.length * 2 + 2);
    });
    player.forEach((hand) => {
        hand.banluck.ratio = hand.banluck.count / totalRounds;
        hand.banban.ratio = hand.banban.count / totalRounds;
        hand.bust.ratio = hand.bust.count / totalRounds;
    });

    console.log(`======== Run ${totalRounds} rounds ========`);
    console.log(rtp);
    console.log(JSON.stringify(blackJackStatistic, undefined, 2));
}

run();
