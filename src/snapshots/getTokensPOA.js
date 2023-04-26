require('dotenv').config();
const path = require('path');
const fs = require('fs-extra');
const {items} = require('./scraped-from-explorer.json');


async function getOwners() {
  const tokenOwners = [];

  for (let item of items) {
    const id = item.split("/poa/core/token/0x051c663523de8b7b22849338eb4faa62f37a8979/instance/")[1].split("<")[0].split(">")[1];
    const address = item.split('data-address-hash="')[1].split('"')[0];
    if (id && address) {
      tokenOwners.push({id: parseInt(id), address});
    }
  }
  tokenOwners.sort((a, b) => a.id - b.id);
  return tokenOwners;
}

getOwners()
    .then(tokenOwners => {
      console.log('Token owners:');
      console.log(tokenOwners);
      fs.writeFile(
          path.join(__dirname, '../../result/tokenOwnersPOA.json'),
          JSON.stringify(tokenOwners, null, 2)
      ).then();
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
