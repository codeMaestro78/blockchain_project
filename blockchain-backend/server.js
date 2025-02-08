const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/blockchain", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Models
const Block = require("./models/Block");

// Blockchain Logic
const CryptoJS = require("crypto-js");

class Blockchain {
  constructor() {
    this.difficulty = 4;
  }

  async createGenesisBlock() {
    const genesisBlock = new Block({
      index: 0,
      timestamp: new Date(),
      transactions: [],
      previousHash: "0",
      nonce: 0,
    });

    genesisBlock.hash = this.calculateHash(genesisBlock);
    await genesisBlock.save();
    return genesisBlock;
  }

  calculateHash(block) {
    return CryptoJS.SHA256(
      block.index +
        block.previousHash +
        block.timestamp +
        JSON.stringify(block.transactions) +
        block.nonce
    ).toString();
  }

  async mineBlock(transactions) {
    const previousBlock = await Block.findOne().sort({ index: -1 });

    const newBlock = new Block({
      index: previousBlock ? previousBlock.index + 1 : 0,
      timestamp: new Date(),
      transactions: transactions,
      previousHash: previousBlock ? previousBlock.hash : "0",
      nonce: 0,
    });

    while (true) {
      newBlock.hash = this.calculateHash(newBlock);
      if (
        newBlock.hash.substring(0, this.difficulty) ===
        Array(this.difficulty + 1).join("0")
      ) {
        break;
      }
      newBlock.nonce++;
    }

    await newBlock.save();
    return newBlock;
  }
}

const blockchain = new Blockchain();

// Routes
app.get("/api/blocks", async (req, res) => {
  try {
    const blocks = await Block.find().sort({ index: 1 });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/blocks/mine", async (req, res) => {
  try {
    const { transactions } = req.body;
    const newBlock = await blockchain.mineBlock(transactions);
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Initialize blockchain with genesis block if empty
async function initBlockchain() {
  const blockCount = await Block.countDocuments();
  if (blockCount === 0) {
    await blockchain.createGenesisBlock();
    console.log("Genesis block created");
  }
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initBlockchain();
});
