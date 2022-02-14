const fs = require('fs-extra')
const path = require('path')
const crypto = require('crypto')

async function sha256File(file) {
  const fileBuffer = await fs.readFile(file)
  const hashSum = crypto.createHash('sha256')
  hashSum.update(fileBuffer)
  return hashSum.digest('hex')
}

const allMetadataV2 = require('../data/allMetadataV2.json')

async function main() {
  for (let i = 0; i < allMetadataV2.length; i++) {
    let m = allMetadataV2[i]
    let name = m.name
    let file = path.resolve(__dirname, '../images/namePNGs/'+name+'.png')
    m.imageSha256 = await sha256File(file)
  }
  await fs.writeFile(path.resolve(__dirname, '../metadata/final-e2gt.json'), JSON.stringify(allMetadataV2, null, 2))
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1)
    })
