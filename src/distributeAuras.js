const fspath = require('fspath')

// we do not want to re-execute this by mistake
process.exit(0)

const auras = require('../data/aurasStats.json')

let redundant = []
for (let aura in auras) {
  let repetition = auras[aura]
  for (let i=0;i<repetition;i++) {
    redundant.push(aura)
  }
}

const finalAuras = []

for (let i=1;i< 10001;i++) {
  let index = Math.round(redundant.length * Math.random())
  if (index === redundant.length) index--
  finalAuras.push(redundant[index] !== 'none' ? redundant[index] : '')
}

let output = new fspath('data/aura10k.json')
output.write(JSON.stringify(finalAuras, null, 2))

let distribution = {}
for (let a of finalAuras) {
  distribution[a] = (distribution[a] || 0) + 1
}

output = new fspath('data/aurasDistribution.json')
output.write(JSON.stringify(distribution, null, 2))


// console.log(distribution)