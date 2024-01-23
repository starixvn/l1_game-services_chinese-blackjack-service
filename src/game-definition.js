import { Core } from "sc-game-base";

export default class GameDefinition extends Core.GameDefinition {
    constructor(
        { id = 0, name = "", durations = {} },
        generateResult,
        settle,
        generateRawResultForHash,
        applyClientSeed,
        actions,
        payouts
    ) {
        super({ id, name, durations }, generateResult, settle, generateRawResultForHash);
        this.actions = actions;
        this.payouts = payouts;
        this.applyClientSeed = applyClientSeed;
    }
}
