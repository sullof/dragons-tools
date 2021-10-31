const sharp = require("sharp")
const path = require('path')
const fs = require('fs')
//
// let bg = 'pinkAndYellow'
// let name = 'agdaroth'
// let id = 10001
//

// async function main() {
//   const bg = '/Users/francescosullo/Projects/Personal/NFTs/everdragons2/ed2-tools/images/backgrounds/yellowGreen.png'
//   const svg = '/Users/francescosullo/Projects/Personal/NFTs/everdragons2/ed2-tools/images/nameSVGs/Schumar.svg'
//   const output = '/Users/francescosullo/Projects/Personal/NFTs/everdragons2/ed2-tools/images/namePNGs/Schumar.png'
//
//   if (fs.existsSync(svg) && fs.existsSync(bg)) {
//
//     const img = await sharp(svg, {density: 216}).png().toBuffer()
//     //
//     // .then(img => {
//
//     const info = await sharp(bg, {density: 216})
//         // .overlayWith(sharp(file, {density: 216}))
//         .composite([{input: img}])
//         .toFile(output)
//
//     console.log(info)
//   }
// }
//
// main()
//   sharp(file, { density: 216 }).png()
//       .toFile(path.resolve(__dirname, `../tmp/${name}.png`))
//       .then(function (info) {
//         console.log(info)
//       })
//       .catch(function (err) {
//         console.log(err)
//       })
//   sharp(file, { density: 72 })
//       .png()
//       .toFile(path.resolve(__dirname, `../tmp/${name}-small.png`))
//       .then(function (info) {
//         console.log(info)
//       })
//       .catch(function (err) {
//         console.log(err)
//       })
//
// } else {
//   console.log('File does not exist')
// }


// let svg = fs.readFileSync(path.resolve(__dirname, '../images/originalSVGs/00010.svg'), 'utf8')

//
const dragonsTools = {

  async pngOverBackground(svg, bg, output, aura) {
    let exists = [fs.existsSync(svg), fs.existsSync(bg), !aura || fs.existsSync(aura)]
    if (exists[0] && exists[1] && exists[2]) {
      let img = await sharp(svg, {density: 216}).png().toBuffer()
      if (aura) {
        img = await sharp(aura, {density: 216})
            .composite([{input: img}])
            .toBuffer()
      }
      await sharp(bg, {density: 216})
          .composite([{input: img}])
          .toFile(output)
    } else {
      console.log('File missing', exists, '\n', svg, '\n', bg, '\n', aura)
    }
  },

  async extractHead(svg, output) {
    const img = await sharp(svg, {density: 348}).png()
        .extract({left: 458, top: 200, width: 1500, height: 1500})
        .toFile(output)
    return img
  },

  removeTail(svg) {
    let tmp = svg.split('<g class="Tail">')
    let res = tmp[0]
    tmp = tmp[1].split('</g>')
    tmp.shift()
    return res + tmp.join('</g>')
  },

  leaveHeadOnly(svg) {
    let tmp = svg.split('<g class="Tail">')
    if (!tmp[1]) {
      tmp = svg.split('<g class="Left_wing">')
    }
    if (!tmp[1]) {
      tmp = svg.split('<g class="Body">')
    }
    let res = tmp[0]
    tmp = tmp[1].split('<g class="Legs">')[1].split('</g>')
    tmp.shift()
    return res + tmp.join('</g>')
  },

  removeWings(svg) {
    let tmp = svg.split('<g class="Left_wing">')
    let res = tmp[0]
    tmp = tmp[1].split('<g class="Right_wing">')[1].split('</g>')
    tmp.shift()
    return res + tmp.join('</g>')
  }

}

module.exports = dragonsTools

// let svg = fs.readFileSync(path.resolve(__dirname, '../images/originalSVGs/00020.svg'), 'utf8')
// let svg2 = dragonsTools.leaveHeadOnly(svg)
// fs.writeFileSync(path.resolve(__dirname, '../tmp/mommo2.svg'), svg2)
//
// dragonsTools.extractHead(path.resolve(__dirname, '../tmp/mommo2.svg'), path.resolve(__dirname, '../tmp/headOnly.svg'))
//     .then(console.log)
// fs.writeFileSync(path.resolve(__dirname, '../tmp/mommo1.svg'), svg1)
//
// let svg2 = dragonsTools.removeWings(svg)
// fs.writeFileSync(path.resolve(__dirname, '../tmp/mommo2.svg'), svg2)
//
// let svg3 = dragonsTools.removeTail(dragonsTools.removeWings(svg))
// fs.writeFileSync(path.resolve(__dirname, '../tmp/mommo3.svg'), svg3)