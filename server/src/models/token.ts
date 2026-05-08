import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  tokenHash: { type: String, required: true },
  jti: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const refreshTokenModel = mongoose.model("refreshToken", refreshTokenSchema);
export {refreshTokenModel};