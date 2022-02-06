const fspath = require('fspath')

const argWinners = require('../data/arg-winners.json')
const goldmineWinners = require('../data/goldmine-winners.json')
const giveawayWinners = require('../data/giveaway-winners.json')
const team = require('../data/team-wallets.json')
const lotteryWinners = require('../data/lottery-winners.json')

const whitelist = {}
const allWinners = []
    .concat(argWinners)
    .concat(goldmineWinners)
    .concat(giveawayWinners)
    .concat(lotteryWinners)
    .concat(team)

// console.log(allWinners.length)

(
    async function main() {


    }
)().then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1)
    })
