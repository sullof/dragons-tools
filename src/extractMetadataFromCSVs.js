// const names = require('../data/dragonsNames.json')
const fspath = require('fspath')
const parse = require('csv-parse/lib/sync')
// const csv = require('csvtojson')
const {getMetadataJSON} = require('./Metadata')

function capitalize(str) {
  return str.split(' ').map(e => e.substring(0,1).toUpperCase() + e.substring(1)).join(' ')
}

const auras = require('../data/auras.json')

// this is supposed to be launched from the root
let input = new fspath('data/10kDNAs.csv')
let data = parse(input.read(), {
  columns: header => header.map(column => capitalize(column))
})

let result = []
for (let i=0;i<data.length - 1;i++) {
  data[i].Aura = auras[i]
  let metadata = getMetadataJSON(data[i])
  result.push(metadata)
  // if (data[i].Names === 'Swoerjond')
  // console.log(JSON.stringify(metadata, null, 2))

}

output = new fspath('data/allMetadata.json')
output.write(JSON.stringify(result, null, 2))



