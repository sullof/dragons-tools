const fspath = require('fspath')
const stringify = require('csv-stringify')

const dragons = require('../data/allMetadataV2.json')
const occurrences = require('../data/occurrences.json')
const rarity = require('../data/rarity.json')

let selected = `Aalfarrd
Aieverphwowor
Ajeeo
Arcobalen
Baedan
Banmitan
Banutat
Boishoor
Cerdaban
Cerugoork
Chaezat
Checaris
Cheyleth
Chraiton
Danfucha
Darpohin
Delucood
Denujoq
Doirux
Draiqoo
Ealfonnd
Eeerkirphsteysam
Faygharr
Foopham
Frabuq
Frashoor
Fuoco
Gadan
Garipalf
Geywhud
Ghazhoqua
Gor
Hatcludar
Hatphyque
Hatwaler
Hinbuban
Honwirad
Honyqooth
Hutsu
Iatobus
Iuthirph
Jauleth
Jealer
Jiagarr
Joork
Jyar
Kaewhud
Kalshylye
Keer
Kelfuden
Kimovord
Kinbrogha
Laeer
Lerhany
Lerohooth
Lieroth
Lleywraph
Loraralf
Maiev
Mauddh
Moehat
Moepham
Morvebur
Mosduryn
Nalblotai
Nalbroser
Neaphar
Nelf
Oeeraq
Oordargh
Paphurr
Peer
Perujord
Pharad
Polofoq
Puidra
Qeelfbro
Qeor
Quablaton
Quatyrad
Quauwoorph
Quayleer
Queeryn
Queushoor
Raakur
Raatsay
Rahoodie
Rakykoq
Ranafoq
Ranegoq
Rayquatin
Reerpha
Reywoorph
Rhaynys
Rheithem
Ryves
Samawuddh
Samchrurak
Samuwalf
Sayazood
Saynysam
Scheygarr
Seiludh
Taiepoo
Taiyburk
Uat
Uoq
Veathoph
Vereqlar
Warvykal
Wyelfdda
Xaelf
Xyievphon
Yark
Yerllekim
Yolar
Youkwerd
Zeybuq
Zheidel
Zootsay`.split('\n')

let res = []

let firstRow = {Name: 1}

async function main() {

  for (let m of dragons) {
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
