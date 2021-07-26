const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");
require('dotenv').config()

const MNEMONIC = process.env.MNEMONIC
const API_KEY = process.env.NODE_KEY

const NFT_CONTRACT_ADDRESS = ""
const OWNER_ADDRESS = "0x5f4c3843495Babe89cB3516cEbD8840024e741fa";
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
const NUM_ITEMS = 5;


let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/GameItem.json"));
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi

async function test() {

      try {
            const provider = new HDWalletProvider(
                  MNEMONIC, MATIC
            );
            const web3Instance = new web3(provider);


            const nftContract = new web3Instance.eth.Contract(
                  NFT_ABI,
                  NFT_CONTRACT_ADDRESS,
            );

            //? in this example i shall check the the URIs of each token id.
            for (var i = 1; i < NUM_ITEMS; i++) {
                  await nftContract.methods
                        .tokenURI(i).call().then((receipt) => {
                              console.log(receipt)
                        }).catch(err => console.log(err))

            }
      }

      catch (e) {
            console.log(e)
      }
}


test().then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});