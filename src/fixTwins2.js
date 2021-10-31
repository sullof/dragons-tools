const fspath = require('fspath')
const parse = require('csv-parse/lib/sync')
const path = require('path')
const fs = require('fs-extra')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const builder = new xml2js.Builder()

const allColors = require('../data/allColors')
const alteredHead = require('../data/alteredHead.json')

let input = new fspath('data/ED210kDNAs.csv')
let data = parse(input.read())

function findRow(name) {
  for (let row of data) {
    if (row[12] === name) {
      return row
    }
  }
}

let elements = [
  'F',
  'W',
  'A',
  'E'
]

function rgba2hex(orig) {
  var a,
      rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || "").trim(),
      hex = rgb ?
          (rgb[1] | 1 << 8).toString(16).slice(1) +
          (rgb[2] | 1 << 8).toString(16).slice(1) +
          (rgb[3] | 1 << 8).toString(16).slice(1) : orig

  if (!/^#/.test(hex)) hex = '#' + hex
  return hex.toUpperCase()
}

function replaceColor(svgJson, klass, color) {
  color = rgba2hex(color)
  klass = klass.substring(1)
  for (let g of svgJson.svg.g) {
    for (let p of g.path) {
      if (p.$.class === klass) {
        p.$.fill = color
      }
    }
  }
  return svgJson
}

let ids = []

async function main() {
  for (let name in alteredHead) {
    let color = alteredHead[name].split(':')[0]
    let element = elements.indexOf(color.substring(0, 1))
    let variant = parseInt(color.substring(1))
    color = allColors[element][variant]
    const row = findRow(name)
    ids.push(row[0])
    let id = parseInt(row[0]) - 1
    let svgName = '0'.repeat(5 - id.toString().length) + id + '.svg'
    let svgPath = path.resolve('./images/originalSVGs/' + svgName)
    if (await fs.pathExists(svgPath)) {
      const svg = await fs.readFile(svgPath, 'utf-8')
      let svgJson = await parser.parseStringPromise(svg)
      for (let klass in color) {
        svgJson = replaceColor(svgJson, klass, color[klass].fill)
      }
      row[9] = variant
      if (row[13] == '1' || row[13] == '2') {
        row[13] = '3'
      }
      // await fs.writeFile(svgPath, await builder.buildObject(svgJson))
    } else {
      console.error('File not found', svgPath)
    }
  }

  data = data.map(e => {
    e[11] = ''
    return e.join(',')
  }).join('\n')

  let output = new fspath('data/tempDNA.csv')
  output.write(data)

  // output = new fspath('data/alteredIds.json')
  // output.write(JSON.stringify(ids, null, 2))

}

main()