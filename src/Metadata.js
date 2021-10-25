const fspath = require('fspath')
const fs = require('fs-extra')
const path= require('path')
const parse = require('csv-parse/lib/sync')
const Case = require('case')

const finalDNA = require('../data/finalDNA.json')
const colors2 = require('../data/colors2.json')

function capitalize(str) {
  return str.split(' ').map(e => e.substring(0, 1).toUpperCase() + e.substring(1)).join(' ')
}

function splitWords(str) {
  return str.replace(/([A-Z]{1})/g, " $1").replace(/^ /, '')
}


let input = new fspath('data/extras.csv')
let extras = parse(input.read(), {
  columns: header => header.map(column => capitalize(column))
})

const example = {
  TokenId: '100',
  Wings: '1',
  Tail: '1',
  Body: '1',
  Legs: '14',
  Head: '1',
  Horns: '13',
  Eyes: '13',
  Domain: '2',
  Color: '7',
  Replceable: '1',
  Replaced: '',
  Names: 'Thranguir',
  Generation: '3',
  Aura: 'halfRainbow'
}

let elements = [
  'Fire',
  'Water',
  'Air',
  'Earth'
]

function isASpecial(gene) {
  for (let extra of extras) {
    if (extra.Extra === gene) {
      return extra
    }
  }
  return false
}

function getName(part, value) {
  let partName = finalDNA[value.toUpperCase()]
  if (!partName) {
    return 'NOT DEFINED'
  }
  let all = partName.split(part)
  if (all[0] !== partName) {
    return partName.replace(/ \w+$/, '')
  }
  return partName
}

let generations = {
  '1': 'First',
  '2': 'Second',
  '3': 'Third',
  '4': 'Fourth',
  '5': 'Fifth',
  '6': 'Sixth',
  '7': 'Seventh'
}

function renameSvg(id, name) {
  id = parseInt(id) - 1
  let svgName = '0'.repeat(5 - id.toString().length) + id + '.svg'
  let inputPath = path.resolve(__dirname, '../images/originalSVGs/'+ svgName)
  if (fs.existsSync(inputPath)) {
    fs.copySync(inputPath, path.resolve(__dirname, '../images/nameSVGs/'+name+'.svg'))
  } else {
    console.log(inputPath + ' not found')
  }

}

function getMetadataJSON(data) {

  // console.log('>>>>', data.TokenId, data.Domain)

  const metadata = {
    description: `EverDragons2 is a collection of 10001 dragons, based on the original EverDragons (2018), randomly generated from hundreds of assets with a few exceptions.`,
    external_url: `https://everdragons2.com/dragons/ed2/${Case.camel(data.Names)}`,
    image: `https://everdragons2.com/png/ed2/${Case.camel(data.Names)}.png`,
    name: data.Names,
    // colorPalette: colors2[elements[parseInt(data.Domain)].substring(0,1).toUpperCase()+ data.Color],
    attributes: [
      {
        trait_type: 'Aura',
        value: splitWords(capitalize(data.Aura))
      },
      {
        trait_type: 'Element',
        value: elements[parseInt(data.Domain)]
      },
      {
        trait_type: 'Color Palette',
        value: elements[parseInt(data.Domain)].substring(0,1).toUpperCase()+ data.Color
      },
      {
        trait_type: 'Generation',
        value: generations[data.Generation]
      }
    ]
  }

  let parts = 'Wings,Tail,Body,Legs,Head,Horns,Eyes'.split(',')
  let initials = 'W,T,B,L,H,C,E'.split(',')

  let purity = {}


  for (let i = 0; i < parts.length; i++) {
    let part = parts[i]
    let value = parseInt(data[part].replace(/[a-zA-Z]+/g, ''))
    let fullValue = initials[i] + data[part].toUpperCase()
    purity[value.toString()] = (purity[value.toString()] || 0) + 1

    if (data[part]) {
      let extra = isASpecial(fullValue)
      if (extra) {
        metadata.attributes.push({
          trait_type: extra.Type,
          value: `${fullValue} ${getName(part, fullValue)}`
        })
        fullValue = fullValue.replace(/[a-zA-Z]{1}$/, '')
        metadata.attributes.push({
          trait_type: part,
          value: `${fullValue} ${getName(part, fullValue)}`
        })
      } else {
        metadata.attributes.push({
          trait_type: part,
          value: `${fullValue} ${getName(part, fullValue)}`
        })
      }
    }
  }

  let purityIndex = 0
  for (let p in purity) {
    purityIndex = Math.max(purityIndex, purity[p])
  }

  metadata.attributes.push({
    trait_type: 'Purity Index',
    value: purityIndex
  })

  // renameSvg(data.TokenId, Case.camel(data.Names))

  return metadata
}

module.exports = {
  isASpecial,
  getName,
  getMetadataJSON
}
