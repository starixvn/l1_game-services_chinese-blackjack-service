import constants from "../constants";
import gameSettings from "../game-settings";
import noticeHelper from "../helpers/notice-helper";
import BaseActionConsumer from "./base-action-consumer";

export default class UserDealConsumer extends BaseActionConsumer {
    async composeActionValidationCriteria(player, payload) {
        const criteria = await super.composeActionValidationCriteria(player, payload);

        const settings = this.gameData.currencyGroupGames.find((x) => x.groupId.toString() === player.session.currencyGroupId);
        const { deal } = payload;
        const minBet = Math.max(player.profile.minBet, settings.minBet);
        const maxBet = Math.min(player.profile.maxBet, settings.maxBet);

        return criteria.concat([
            {
                failure: deal.hands.find((hand) => !hand.bet || hand.bet < minBet),
                notice: this.getNoticeObj(noticeHelper.minBet, { minBet }),
            },
            {
                failure: deal.hands.find((hand) => !hand.bet || hand.bet > maxBet),
                notice: this.getNoticeObj(noticeHelper.maxBet, { maxBet }),
            },
            {
                failure: deal.hands.some((hand) => !hand.pos || hand.pos < 1 || hand.pos > 3),
                notice: this.getNoticeObj(noticeHelper.invalidPosition),
            },
            {
                failure: !deal.hands || deal.hands.length < constants.minPlayerHand || deal.hands.length > constants.maxPlayerHand,
                notice: this.getNoticeObj(noticeHelper.invalidDealHands),
            },
            {
                failure: this.gameData.ingame[player.profile.name]?.betTracks?.roundId,
                notice: this.getNoticeObj(noticeHelper.invalidDealDueToRunningRound),
            },
        ]);
    }

    async consume(player, payload) {
        const { deal } = payload;

        await super.consume(player, payload, { action: gameSettings.actions.deal, hands: deal.hands });
    }
}
