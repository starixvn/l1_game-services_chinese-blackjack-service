import { Core } from "sc-game-base";
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    ...Core.Models.ResultSchema.obj,
    encryptedFinalResult: { iv: { type: String }, content: { type: String } },
});
const results = mongoose.model("chineseblackjack_results", Schema);

export { results as ChineseBlackjackResults };
