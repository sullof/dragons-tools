const fspath = require('fspath')
const keccak256 = require('keccak256')
const ethers = require('ethers')
const argWinners = require('../data/arg-winners.json')
const goldmineWinners = require('../data/goldmine-winners.json')
const giveawayWinners = require('../data/giveaway-winners.json')
const team = require('../data/team-wallets.json')
const lotteryWinners = require('../data/28-lottery-winners.json')

console.log('giveawayWinners', giveawayWinners.length)
console.log('goldmineWinners', goldmineWinners.length)
console.log('argWinners', argWinners.length)
console.log('team', team.length)
console.log('lotteryWinners', lotteryWinners.length)

async function main() {

  const whitelist = []
  const tmp = {}
  const allWinners = []
      .concat(team)
      .concat(giveawayWinners)
      .concat(goldmineWinners)
      .concat(argWinners)
      .concat(lotteryWinners)

  console.log('Total', allWinners.length)

  for (let winner of allWinners) {
    if (!winner.removed) {
      if (!winner.wallet) {
        console.log('Wallet missing for', winner)
        winner.wallet = ethers.Wallet.createRandom().address
      }
      tmp[winner.wallet] = (tmp[winner.wallet] || 0) + 1
    }
  }
  let nextTokenId = 1
  for (let address in tmp) {
    let tokenIds = []
    for (let j=0;j<tmp[address];j++) {
      tokenIds.push(nextTokenId++)
    }
    whitelist.push({
      address,
      tokenIds
    })
  }
  let output = new fspath('data/whitelist.json')
  output.write(JSON.stringify(whitelist, null, 2))
}

main().then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1)
    })
