const dna = require('../data/finalDNA.json')
const fspath = require('fspath')
const parse = require('csv-parse/lib/sync')

let parts = 'Family,Wings,Tail,Body,Legs,Head,Horns,Eyes'.split(',')
let cols = ',W,T,B,L,H,C,E'.split(',')

/*
    "C24": "Loki",
    "E24": "Elf",
    "W1B": "Golden Original",
    "W2B": "Golden Feathers",
*/

let data = {}

for (let gene in dna) {

  let n = gene.replace(/[A-Z]/, '')
  if (!data[n]) {
    data[n] = ['','','','','','','','']
  }
  let col = cols.indexOf(gene.substring(0, 1))
  data[n][col-1] = dna[gene]
}

let csv = []

for (let k in data) {
  let elem = [k].concat(data[k])
  csv.push(elem)
}

// console.log(JSON.stringify(csv))

csv.sort((a,b) => {
  let A = parseInt(a[0].replace(/[A-Z]/, ''))
  let B = parseInt(b[0].replace(/[A-Z]/, ''))
  let AA = a[0].replace(/\d+/, '') || '0'
  let BB = b[0].replace(/\d+/, '') || '0'
  // console.log(a[0])
  return AA > BB ? 1 : AA < BB ? -1: A > B ? 1  : A < B ? -1 : 0
})

let final = parts.join(',')
for (let row of csv) {
  final += '\n' + row.join(',')
}


output = new fspath('data/namesFromDNA.csv')
output.write(final)
