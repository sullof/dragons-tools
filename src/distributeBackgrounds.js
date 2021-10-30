const fspath = require('fspath')

// we do not want to re-execute this by mistake
process.exit(0)

const backgrounds = require('../data/backgrounds.json')

let redundant = []
for (let background in backgrounds) {
  let repetition = backgrounds[background]
  for (let i=0;i<repetition;i++) {
    redundant.push(background)
  }
}

const auras = []

for (let i=1;i< 10001;i++) {
  let index = Math.round(redundant.length * Math.random())
  if (index === redundant.length) index--
  auras.push(redundant[index])
}

let output = new fspath('data/background10k.json')
output.write(JSON.stringify(auras, null, 2))

let distribution = {}
for (let a of auras) {
  distribution[a] = (distribution[a] || 0) + 1
}

output = new fspath('data/backgroundsDistribution.json')
output.write(JSON.stringify(distribution, null, 2))


// console.log(distribution)