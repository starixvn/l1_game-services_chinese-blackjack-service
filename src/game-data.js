import { Table } from "sc-game-base";

export default class GameData extends Table.TableGameData {
    constructor(remainingTime) {
        super(remainingTime);
        this.betId = 0;
        this.provablyFair = {};

        this.clientSeed = {};
        this.nextResult = {};
        this.serverSeed = {};
        this.hash = {};
        this.finalResult = {};
    }
}
