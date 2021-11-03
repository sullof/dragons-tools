const fspath = require('fspath')

const dragons = require('../data/allMetadataV2.json')
const avatars = require('../data/allMetadataHeadV2.json')

let occurrences = {
  dragons: {},
  avatars: {}
}

let rarity = {
  dragons: {},
  avatars: {}
}

for (let i = 0; i < 2; i++) {

  let metadata = i ? dragons : avatars
  let occ = i ? occurrences.dragons : occurrences.avatars
  let rar = i ? rarity.dragons : rarity.avatars

  for (let m of metadata) {
    for (let a of m.attributes) {
      if (!occ[a.trait_type]) {
        occ[a.trait_type] = {}
      }
      occ[a.trait_type][a.value] = (occ[a.trait_type][a.value] || 0) + 1
    }
  }

  for (let trait in occ) {
    if (!rar[trait]) {
      rar[trait] = {}
    }
    for (let value in occ[trait]) {
      rar[trait][value] = 100 * occ[trait][value] / 10000
    }
  }

}


// After first execution, we manipulate the SVGs with fixTwins2.js

let output = new fspath('data/occurrences.json')
output.write(JSON.stringify(occurrences.dragons, null, 2))

output = new fspath('data/rarity.json')
output.write(JSON.stringify(rarity.dragons, null, 2))

output = new fspath('data/occurrencesAvatars.json')
output.write(JSON.stringify(occurrences.avatars, null, 2))

output = new fspath('data/rarityAvatars.json')
output.write(JSON.stringify(rarity.avatars, null, 2))

