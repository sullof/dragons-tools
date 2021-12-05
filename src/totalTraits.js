const fspath = require('fspath')
const stringify = require('csv-stringify')

const dragons = require('../data/allMetadataHeadV2.json')



async function main() {

  let traits = {}

  for (let m of dragons) {
      for (let a of m.attributes) {
        traits[a.trait_type] = 1
      }
  }

console.log(Object.keys(traits))

}

main()
