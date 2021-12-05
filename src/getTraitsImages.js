const path = require('path')
const fs = require('fs-extra')

const dragons = require('../data/allMetadataV2.json')


let selected = []
let dirPath = path.resolve(__dirname, '../tmp/selected/nowings')

async function main() {

  let traits = {}

  for (let m of dragons) {
      for (let a of m.attributes) {
        if (a.trait_type === 'Wings' && /none/.test(a.value)) {
          selected.push(m.name)
        }
      }
  }


  for (let img of selected) {
    await fs.copy(path.resolve(__dirname, `../images/namePNGs/${img}.png`), path.join(dirPath, `${img}.png`))
  }

}

main()
