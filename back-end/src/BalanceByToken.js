const express = require('express');
const cors = require('cors');
const { Alchemy, Network } = require('alchemy-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Alchemy
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY || "Z2gAy-Oelj2gDuzdQ-9TL",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

// Middleware
app.use(cors());
app.use(express.json());

// Get all token balances for an address
app.get('/api/tokens/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Get token balances
    const balances = await alchemy.core.getTokenBalances(address);
    
    // Filter out tokens with zero balance and get metadata
    const tokenDataPromises = balances.tokenBalances
      .filter(token => parseInt(token.tokenBalance, 16) > 0)
      .map(async (token) => {
        try {
          const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
          const balance = parseInt(token.tokenBalance, 16);
          const decimals = metadata.decimals || 18;
          const formattedBalance = balance / Math.pow(10, decimals);
          
          return {
            contractAddress: token.contractAddress,
            balance: token.tokenBalance,
            formattedBalance: formattedBalance.toFixed(6),
            name: metadata.name || 'Unknown Token',
            symbol: metadata.symbol || 'UNKNOWN',
            decimals: metadata.decimals || 18,
            logo: metadata.logo || null
          };
        } catch (error) {
          console.error(`Error fetching metadata for ${token.contractAddress}:`, error);
          return {
            contractAddress: token.contractAddress,
            balance: token.tokenBalance,
            formattedBalance: (parseInt(token.tokenBalance, 16) / Math.pow(10, 18)).toFixed(6),
            name: 'Unknown Token',
            symbol: 'UNKNOWN',
            decimals: 18,
            logo: null
          };
        }
      });

    const tokenData = await Promise.all(tokenDataPromises);
    
    // Also get ETH balance
    const ethBalance = await alchemy.core.getBalance(address, 'latest');
    const ethBalanceInEth = parseFloat(ethBalance._hex) / Math.pow(10, 18);
    
    const response = {
      address,
      ethBalance: {
        balance: ethBalance._hex,
        formattedBalance: ethBalanceInEth.toFixed(6),
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
      },
      tokens: tokenData,
      totalTokens: tokenData.length
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching token balances:', error);
    res.status(500).json({ 
      error: 'Failed to fetch token balances',
      details: error.message 
    });
  }
});

// Get transfers for an address (keeping your existing endpoint)
app.get('/api/transfers/:address?', async (req, res) => {
  try {
    const address = req.params.address || '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // Default address
    
    const transfers = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      category: ['external', 'erc20', 'erc721', 'erc1155'],
      withMetadata: true,
      excludeZeroValue: true,
      maxCount: 100
    });

    const formattedTransfers = transfers.transfers.map(transfer => ({
      network: 'Ethereum',
      blockNum: transfer.blockNum,
      from: transfer.from,
      to: transfer.to,
      asset: transfer.asset || 'ETH',
      value: transfer.value,
      category: transfer.category,
      hash: transfer.hash
    }));

    res.json(formattedTransfers);
  } catch (error) {
    console.error('Error fetching transfers:', error);
    res.status(500).json({ 
      error: 'Failed to fetch transfers',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Alchemy API Key: ${process.env.ALCHEMY_API_KEY ? 'Set' : 'Not set'}`);
});

module.exports = app;