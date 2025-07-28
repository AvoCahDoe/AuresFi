// server.js
import express from "express";
import { Alchemy, Network } from "alchemy-sdk";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
const port = 3000;

const address = process.env.WALLET_ADDRESS;

const networks = [
  {
    name: "Ethereum",
    config: {
      apiKey: process.env.ALCHEMY_ETH_KEY,
      network: Network.ETH_MAINNET,
    },
  },
  {
    name: "Polygon",
    config: {
      apiKey: process.env.ALCHEMY_POLYGON_KEY,
      network: Network.MATIC_MAINNET,
    },
  },
  {
    name: "Arbitrum",
    config: {
      apiKey: process.env.ALCHEMY_ARBITRUM_KEY,
      network: Network.ARB_MAINNET,
    },
  },
];

async function fetchTransfersForNetwork(name, alchemy) {
  const baseParams = {
    fromBlock: "0x0",
    toBlock: "latest",
    excludeZeroValue: true,
    category: ["external", "erc20", "erc721", "erc1155"],
    withMetadata: true,
  };

  const [incoming, outgoing] = await Promise.all([
    alchemy.core.getAssetTransfers({ ...baseParams, toAddress: address }),
    alchemy.core.getAssetTransfers({ ...baseParams, fromAddress: address }),
  ]);

  return [...incoming.transfers, ...outgoing.transfers].map((tx) => ({
    ...tx,
    network: name,
  }));
}

async function getAllTransfers() {
  const allResults = [];
  for (const { name, config } of networks) {
    const alchemy = new Alchemy(config);
    console.log(`Fetching transfers on ${name}...`);
    const transfers = await fetchTransfersForNetwork(name, alchemy);
    allResults.push(...transfers);
  }
  // Sort by block number descending
  return allResults.sort((a, b) => parseInt(b.blockNum, 16) - parseInt(a.blockNum, 16));
}

app.get("/transfers", async (req, res) => {
  try {
    const transfers = await getAllTransfers();
    res.json(transfers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transfers" });
  }
});

app.use(express.static("public")); // serve frontend files from public/

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
