const crypto = require('crypto')
const path = require('path')
const fs = require('fs-extra')

const dragons = require('../data/allMetadataV2.json')


async function sha256File(file) {
  const fileBuffer = await fs.readFile(file)
  const hashSum = crypto.createHash('sha256')
  hashSum.update(fileBuffer)
  return hashSum.digest('hex')
}


async function main() {

  let traits = {}

  for (let m of dragons) {
      let name = m.name
    m.imageHash  = sha256File(path.resolve(__dirname, "../images/namePNGsGenesis", name))

  }

console.log(Object.keys(traits))

}

main()
