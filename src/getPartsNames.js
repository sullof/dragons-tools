// const names = require('../data/dragonsNames.json')
const fspath = require('fspath')
const parse = require('csv-parse/lib/sync')
const finalDNA = require('../data/finalDNA.json')

let dir = new fspath('data/parts-names.csv')
const data = parse(dir.read())

let genes = data[0].slice(1).map(e => {
  if (e === 'Horns') return 'C'
  else return e.substring(0, 1)
})

for (let i = 1; i < data.length; i++) {
  let d = data[i]
  let n = d[0]
  for (let i = 1; i < 8; i++) {
    if (d[i]) {
      finalDNA[genes[i - 1] + n] = d[i]
    }
  }
}
//
// dir = new fspath('data/special-parts-names.csv')
// const specials = parse(dir.read())
//
// for (let i = 1; i < specials.length; i++) {
//   let d = specials[i]
//   originalDNA[d[1] + 'b'] = capitalize(d[0])
// }
//
// // console.log('Looking for duplicates')
// //
// let checkForDuplicates = {}
// let duplicateFound = false
//
// for (let gene in originalDNA) {
//   if (checkForDuplicates[originalDNA[gene]]) {
//     console.log(gene, originalDNA[gene])
//     duplicateFound = true
//   }
//   checkForDuplicates[originalDNA[gene]] = 1
// }
//
// if (duplicateFound) {
//   console.error('Whoops, there are duplicates')
//   process.exit(1)
// }
//
// (new fspath('data/originalDNA.json')).write(JSON.stringify(originalDNA, null, 2))
//
// for (let gene in originalDNA) {
//   let name = originalDNA[gene]
//   gene = gene.replace(/L0(\d{1})E(\d+)([a-z]*)/, function (a, b, c, d) {
//     // console.log(a, b,c,d)
//     return genes[parseInt(b) - 1] + parseInt(c) + (d || '').toUpperCase()
//   })
//   finalDNA[gene] = name
// }

// console.log(finalDNA)

// (new fspath('data/finalDNA.json')).write(JSON.stringify(finalDNA, null, 2))
