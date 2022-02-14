const fspath = require('fspath')
const fs = require('fs-extra')
const path = require('path')


function capitalize(str) {
  return str.split(' ').map(e => e.substring(0, 1).toUpperCase() + e.substring(1)).join(' ')
}

function splitWords(str) {
  return str.replace(/([A-Z]{1})/g, " $1").replace(/^ /, '')
}


function getMetadataJSON(id) {

  let gif = Math.floor(6 * Math.random()) + 1
  if (gif > 6) {
    gif = 6
  }

  const metadata = {
    description: `Everdragons2 Genesis is a collection of 1000 dragons randomly generated from hundreds of assets. They inherit the legacy of Everdragons, minted in 2018 as the first bridgeable cross-chain non-fungible token (NFT)  for gaming. In the marvelous upcoming Origins, the play-to-earn game of the Everdragons Metaverse, holders of Everdragons2 will get a Loot Box containing Obsidian (the Origins token), Settlement Plans, and Genesis Units based on rarity.`,
    image: `https://img.everdragons2.com/assets/animation${gif}.gif`,
    name: 'Everdragons2 Genesis Egg #' + id,
    attributes: []
  }

  return metadata
}

async function main() {
  const output = path.resolve(__dirname, '../output')
  await fs.ensureDir(output)
  for (let i = 1; i <= 1000; i++) {
    let metadata = getMetadataJSON(i)
    await fs.writeFile(path.resolve(output, ''+ i), JSON.stringify(metadata))
  }
}



main()
