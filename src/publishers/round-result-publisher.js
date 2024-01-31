import { Core } from "sc-game-base";

export default class RoundResultPublisher extends Core.BaseEventPublishers.BaseEventPublisher {
    publishRoundResult(roundResult) {
        this.publishToUser(roundResult.playerId, { finish: roundResult.result });
    }

    publishProvablyFair(playerId, provablyFair) {
        this.publishToUser(playerId, {
            resultHash: { hashValue: provablyFair.hash },
            ...(provablyFair.clientSeed && { clientSeed: provablyFair.clientSeed }),
        });
    }
}
