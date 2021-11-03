const fspath = require('fspath')

// we do not want to re-execute this by mistake
process.exit(0)

const values = require('../data/valuesStats.json')

let redundant = []
for (let value in values) {
  let repetition = values[value]
  for (let i=0;i<repetition;i++) {
    redundant.push(value)
  }
}

let properties = [
  'Strength',
  'Dexterity',
  'Intelligence',
  'Focus',
  'Constitution'
]

const finalvalues = []

for (let i=1;i< 10001;i++) {
  let str = ''
  for (let k=0;k<5;k++) {
    let index = Math.round(redundant.length * Math.random())
    if (index === redundant.length) index--
    str += redundant[index] !== 'none' ? redundant[index] : '5'
  }
  finalvalues.push(str)
}

let output = new fspath('data/value10k.json')
output.write(JSON.stringify(finalvalues, null, 2))

// let distribution = {}
// for (let a of finalvalues) {
//   distribution[a] = (distribution[a] || 0) + 1
// }
//
// output = new fspath('data/valuesDistribution.json')
// output.write(JSON.stringify(distribution, null, 2))


// console.log(distribution)