const fspath = require('fspath')

const argWinners = require('../data/arg-winners.json')
const goldmineWinners = require('../data/goldmine-winners.json')
const goldmineWinners = require('../data/giv')
const rarity = require('../data/rarity.json')



let res = []

let firstRow = {Name: 1}

async function main() {

  for (let m of argWinners) {
    if (~selected.indexOf(m.name)) {
      let row = {}
      let i = res.length
      res[i] = [m.name, row]

      for (let a of m.attributes) {
        if (!firstRow[a.trait_type]) {
          firstRow[a.trait_type] = 1
        }
        row[a.trait_type] = [a.value, rarity[a.trait_type][a.value] + '%']
      }
    }
  }

  let traits = Object.keys(firstRow).slice(1)
  res[0] = ['Name']
  for (let t of traits) {
    res[0].push(t, 'Rarity')
  }

  for (let i = 1; i< res.length;i++) {
    let data = res[i][1]
    res[i][1] = ''
    for (let d in data) {
      let index = res[0].indexOf(d)
      let values = data[d]
      res[index] =
    }
  }

  //
  // res.sort((a,b) => {
  //   a = a[0]
  //   b = b[0]
  //   return a >b ? 1 : a < b ? -1 : 0
  // })
  //
  // res[0][0] = 'Name'
  //
  // stringify(res, function(err, output){
  //   const csv = new fspath('data/selectedProperties.csv')
  //   csv.write(output)
  // })

}

main()
