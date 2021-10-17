const names = require('../data/dragonsNames.json')
const fspath = require('fspath')
const parse = require('csv-parse/lib/sync')


let str = ''
for (let n of names) {
  str += n + '\n'
}

// this is supposed to be launched from the root
let dir = new fspath('data/parts-names.csv')
const data = parse(dir.read())

let genes = data[0].slice(1).map(e => {
  if (e === 'Horns') return 'A'
  else return e.substring(0,1)
})

const originalDNA = {}
const finalDNA = {}

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

dir = new fspath('data/special-parts-names.csv')
const specials = parse(dir.read())

for (let i=1;i<specials.length; i++) {
  let d = specials[i]
  originalDNA[d[1]+ 'b'] = capitalize(d[0])
}




// console.log('Looking for duplicates')
//
let checkForDuplicates = {}
let duplicateFound = false

for (let gene in originalDNA) {
  if (checkForDuplicates[originalDNA[gene]]) {
    console.log(gene, originalDNA[gene])
    duplicateFound = true
  }
  checkForDuplicates[originalDNA[gene]] = 1
}

if (duplicateFound) {
  console.error('Whoops, there are duplicates')
  process.exit(1)
}

(new fspath('data/originalDNA.json')).write(JSON.stringify(originalDNA, null, 2))

for (let gene in originalDNA) {
  let name = originalDNA[gene]
  gene = gene.replace(/L0(\d{1})E(\d+)([a-z]*)/, function (a, b, c, d) {
    // console.log(a, b,c,d)
    return genes[parseInt(b) - 1] + parseInt(c) + (d || '').toUpperCase()
  })
  finalDNA[gene] = name
}

(new fspath('data/finalDNA.json')).write(JSON.stringify(finalDNA, null, 2))
