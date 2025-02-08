const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: { type: Date, default: Date.now },
  transactions: [
    {
      sender: String,
      recipient: String,
      amount: Number,
    },
  ],
  previousHash: String,
  hash: String,
  nonce: Number,
});

module.exports = mongoose.model("Block", blockSchema);
