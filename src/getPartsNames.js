const names = require('../data/dragonsNames.json')
const fspath = require('fspath')
const parse = require('csv-parse/lib/sync')


let str = ''
for (let n of names) {
  str += n + '\n'
}

// this is supposed to be launched from the root
const dir = new fspath('data/parts-names.csv')
const data = parse(dir.read())

const originalDNA = {}

function capitalize(str) {
  return str.split(' ').map(e => e.substring(0,1).toUpperCase() + e.substring(1)).join(' ')
}

for (let i=1;i<data.length;i++) {
  let d = data[i]
  let n = d[0]
  n = '0'.repeat(3 - n.length) + n
  originalDNA['L01E'+n] = capitalize(d[1])
  originalDNA['L02E'+n] = capitalize(d[2])
  originalDNA['L03E'+n] = capitalize(d[3])
  originalDNA['L04E'+n] = capitalize(d[4])
  originalDNA['L05E'+n] = capitalize(d[5])
  originalDNA['L06E'+n] = capitalize(d[6])
  originalDNA['L07E'+n] = capitalize(d[7])
}

// console.log(originalDNA)
(new fspath('data/originalDNA.json')).write(JSON.stringify(originalDNA, null, 2))


