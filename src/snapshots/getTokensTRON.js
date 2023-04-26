require("dotenv").config();
const path = require("path");
const fs = require("fs-extra");
const TronWeb = require('tronweb');
const { ERC721ABI: abi, contracts } = require('./config');

const fullNode = 'https://api.trongrid.io';
const solidityNode = 'https://api.trongrid.io';
const eventServer = 'https://api.trongrid.io';

// A RANDOM PRIVATE KEY. Do not use it anywhere else
const privateKey = 'aa1ee219d55a6edbee3876faa94140447e81b19fe92e8627dde917e448838977';

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const contractAddress = contracts.TRON;

const contract = tronWeb.contract(abi, contractAddress);

async function getOwners() {
  const tokenOwners = [];
  const startTokenId = 1;
  const endTokenId = 972;

  for (let tokenId = startTokenId; tokenId <= endTokenId; tokenId++) {
    try {
      const owner = await contract.ownerOf(tokenId).call();
      console.log(`Token ID ${tokenId} is owned by ${owner}`);
      tokenOwners.push({ tokenId, owner });
    } catch (error) {
      // at tokenID === 395 it should throw an error
      break;
    }
  }

  return tokenOwners;
}

getOwners()
    .then(tokenOwners => {
      console.log('Token owners:');
      console.log(tokenOwners);
      fs.writeFile(path.join(__dirname, '../../result/tokenOwnersTRON.json'), JSON.stringify(tokenOwners, null, 2)).then();
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
