const mongoose = require("mongoose");
const generate = require("../../../helpers/generate");

const forgotPasswordSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expireAt: { type: Date, required: true }
}
, {
    timestamps: true
});
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");
module.exports = ForgotPassword;