import { Core } from "sc-game-base";
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    roundId: { type: Number, required: true },
    clientSeed: { type: Number, required: true },
    encryptedServerSeed: { iv: { type: String }, content: { type: String } },
    hash: { type: String, required: true },
    encryptedFinalResult: { iv: { type: String }, content: { type: String } },
    time: { type: Date, default: new Date() },
});
const results = mongoose.model("chineseblackjack_results", Schema);

export { results as ChineseBlackjackResults };
