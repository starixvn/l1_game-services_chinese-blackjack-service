import { Table } from "sc-game-base";

export default class GameData extends Table.TableGameData {
    constructor(remainingTime) {
        super(remainingTime);
        this.betId = 0;
        this.nextResult = {};
        this.result = {};
        this.clientSeed = {};
        this.nextResultHash = {};
    }
}
