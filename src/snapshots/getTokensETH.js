require("dotenv").config();
const path = require("path");
const fs = require("fs-extra");
const Web3 = require('web3');
const { ERC721ABI: abi, contracts } = require('./config');

const infuraKey = process.env.INFURA_API_KEY;
const providerUrl = `https://mainnet.infura.io/v3/${infuraKey}`;
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const contractAddress = contracts.ETH;
const contract = new web3.eth.Contract(abi, contractAddress);

async function getOwners() {
  const tokenOwners = [];
  const startTokenId = 1;
  const endTokenId = 1000;

  for (let tokenId = startTokenId; tokenId <= endTokenId; tokenId++) {
    try {
      const owner = await contract.methods.ownerOf(tokenId).call();
      console.log(`Token ID ${tokenId} is owned by ${owner}`);
      tokenOwners.push({ tokenId, owner });
    } catch (error) {
      // at tokenID === 973 it should throw an error
      break;
    }
  }

  return tokenOwners;
}

getOwners()
    .then(tokenOwners => {
      console.log('Token owners:');
      console.log(tokenOwners);
      fs.writeFile(path.join(__dirname, '../../result/tokenOwnersETH.json'), JSON.stringify(tokenOwners, null, 2)).then();
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
