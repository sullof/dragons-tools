
const dna = require('../data/allMetadataHeadV2.json')
const colors2 = require('../data/colors2.json')
const fspath = require('fspath');

let data = {}
let clones = {}
let allCombos = {}
for (let gene in dna) {
  let dragon = dna[gene]
  let combo = ''
  for (let trait of dragon.attributes) {
    if (trait.trait_type === 'Color Palette') {
      let color = trait.value.split(' #')
      color = color[0].substring(0, 1) + color[1]
      combo += color + ':'
    }
    if (trait.trait_type === 'Head') {
      combo += trait.value.split(' ')[0]
    }
    if (trait.trait_type === 'Horns') {
      combo += trait.value.split(' ')[0]
    }
    if (trait.trait_type === 'Eyes') {
      combo += trait.value.split(' ')[0]
    }
  }
  if (data[combo]) {
    if (!clones[combo]) {
      clones[combo] = {}
    }
    clones[combo][dragon.name] = 1
    clones[combo][data[combo]] = 1
  }
  data[combo] = dragon.name
  allCombos[combo] = true
}

console.log(clones)

process.exit()

const altered = {}

for (let combo in clones) {
  let color = combo.split(':')[0]
  let twins = Object.keys(clones[combo])
    console.log(twins)
  for (let i = 1; i < twins.length; i++) {
    let element = color.substring(0, 1)
    let ok = false
    let k = Math.round(9 * Math.random())
    for (let j = 0; j < 10; j++) {
      // find an available color palette
      let newCombo = element + k + ':' + combo.split(':')[1]
      if (!allCombos[newCombo]) {
        altered[twins[i]] = newCombo
        ok = true
        break
      }
      if (k === 9) {
        k = 0
      }
    }
  }
}

// After first execution, we manipulate the SVGs with fixTwins2.js

// let output = new fspath('data/alteredHead.json')
// output.write(JSON.stringify(altered, null, 2))

