import constants from "../constants";
import gameSettings from "../game-settings";
import { calculate } from "../helpers/card-helper";
import noticeHelper from "../helpers/notice-helper";
import BaseActionConsumer from "./base-action-consumer";

export default class UserStandConsumer extends BaseActionConsumer {
    async composeActionValidationCriteria(player, payload) {
        const criteria = await super.composeActionValidationCriteria(player, payload);

        const playerData = this.gameData.ingame[player.profile.name];
        const hand = playerData?.betTracks?.hands?.find((currentHand) => currentHand.id === payload.stand.id);

        return criteria.concat([
            {
                failure: !hand,
                notice: this.getNoticeObj(noticeHelper.invalidHandId),
            },
            {
                failure: hand?.isStand,
                notice: this.getNoticeObj(noticeHelper.handIsStand),
            },
            {
                failure: hand?.id !== playerData.betTracks.activeHandId,
                notice: this.getNoticeObj(noticeHelper.handNotActive),
            },
            {
                failure: !calculate(hand?.cards).some((currentHand) => currentHand >= constants.minPlayerPoint),
                notice: this.getNoticeObj(noticeHelper.invalidStandPoint),
            },
        ]);
    }

    async consume(player, payload) {
        await super.consume(player, payload, { action: gameSettings.actions.stand, id: payload.stand.id });
    }
}
