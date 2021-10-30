// const names = require('../data/dragonsNames.json')
const fspath = require('fspath')
const parse = require('csv-parse/lib/sync')
// const csv = require('csvtojson')
const {getMetadataJSON, getHeadMetadataJSON} = require('./Metadata')

function capitalize(str) {
  return str.split(' ').map(e => e.substring(0, 1).toUpperCase() + e.substring(1)).join(' ')
}

const backgrounds = require('../data/background10k.json')
const backgroundsNewNames = require('../data/backgroundsNewNames.json')
const auras = require('../data/aura10k.json')

// this is supposed to be launched from the root
let input = new fspath('data/ED210kDNAs.csv')
let data = parse(input.read(), {
  columns: header => header.map(column => capitalize(column))
})

input = new fspath('data/missingParts.csv')
let wTData = parse(input.read(), {
  columns: header => header.map(column => capitalize(column))
})

let missingParts = {}
for (let id of wTData) {
  missingParts[id.Id] = {
    W: !parseInt(id.W),
    T: !parseInt(id.T),
  }
}

let result = []
let resultHead = []

async function main() {
  for (let i = 0; i < data.length; i++) {
    data[i].Aura = auras[i]
    data[i].BgFile = backgrounds[i]
    data[i].Bg = backgroundsNewNames[backgrounds[i]]
    // if (data[i].TokenId != 2641) {
    //   continue
    // }
    // if (data[i].Aura !== 'octal') {
    //   continue
    // }
    // console.log(data[i].Names, data[i].Aura)
    let metadata = await getMetadataJSON(
        data[i],
        missingParts,
        // i > 123 && i < 134
        // true // < to avoid slowly re-generating images
    )
    // if (i === 134) process.exit()
    result.push(metadata)
    let metadataHead = await getHeadMetadataJSON(
        data[i],
        // i > 123 && i < 134 // true
    )
    resultHead.push(metadataHead)
  }
  let output = new fspath('data/allMetadataV2.json')
  output.write(JSON.stringify(result, null, 2))
  output = new fspath('data/allMetadataHeadV2.json')
  output.write(JSON.stringify(resultHead, null, 2))
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1)
    })
