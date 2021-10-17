const sharp = require("sharp")
const path = require('path')
const fs = require('fs')
//
// let bg = 'pinkAndYellow'
// let name = 'agdaroth'
// let id = 10001
//
// const background = path.resolve(__dirname, `../images/backgrounds/${bg}.png`)
// const file = path.resolve(__dirname, `../images/svg/${name}.svg`)
// if (fs.existsSync(file) && fs.existsSync(background)) {
//
//   sharp(file, { density: 216 }).png().toBuffer()
//       .then(img => {
//
//         sharp(background, {density: 216})
//             // .overlayWith(sharp(file, {density: 216}))
//             .composite([{input: img}])
//             .toFile(path.resolve(__dirname, `../tmp/${id}.png`))
//             .then(function (info) {
//               console.log(info)
//             })
//             .catch(function (err) {
//               console.log(err)
//             })
//       })
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


class DragonsTools {

  async pngOverBackground(svg, bg, output) {
    const dragon = await sharp(svg, { density: 216 }).png().toBuffer()
    return await sharp(bg)
      .composite([{input: dragon}])
      .toFile(output)
  }

}

module.exports = DragonsTools