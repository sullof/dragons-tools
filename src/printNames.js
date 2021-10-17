const names = require('../data/dragonsNames.json')
const fspath = require('fspath')


let str = ''
for (let n of names) {
  str += n + '\n'
}

// this is supposed to be launched from the root
const dir = new fspath('data/names.txt')
dir.write(str)


