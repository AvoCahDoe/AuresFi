import dotenv from 'dotenv';
import { Alchemy, Network } from 'alchemy-sdk';
import { formatUnits } from 'ethers';

//load .env from outside dir
dotenv.config({ path: '../.env' });

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(config);

const main = async () => {
  const MyAdress = process.env.WALLET_ADDRESS;
  const usdcPolygonContract = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

  const response = await alchemy.core.getTokenBalances(MyAdress, [usdcPolygonContract]);

  const tokenBalanceHex = response.tokenBalances[0].tokenBalance;
  const balanceBigInt = BigInt(tokenBalanceHex);
  const formattedBalance = formatUnits(balanceBigInt, 6);

  console.log("USDC Balance:", formattedBalance);
};




main();
