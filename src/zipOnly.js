let changeFiles = `Chevrurst
Yeer
Qoth
Lletsay
Kellahon
Blebur
Rynoqord
Bandinys
Pheitin
Nybemos
Chakin
Bouddh
Healudh
Naqua
Rayrahin
Ghayzurk
Neeleth
Chreuloodd
Mavrurst
Myiev
Schaybuq
Banuqier
Draiqoo
Moryxat
Gyrphoor
Deser
Warsmekin
Muuth
Stoikur
Huigha
Quytan
Brautai
Vorshewar
Tasecark
Frabuq
Kiuth
Joobuq
Hatrhosul
Hiphaw
Aord
Banibat
Nyasor
Doo
Rayowark
Shyiloth
Kelsturan
Kimidooth
Triagharr
Kaeer
Blergand
Rilezat
Hatlluque
Beirnoth
Poolpith
Deloyoo
Banywoo
Blidel
Feulza
Rodquabur
Darycood
Pahat
Nylargro
Frathoph
Kalyduth
Kyooth
Rothswihat
Blaibel
Quoernoth
Delaqar
Boikwerd`.split('\n')

const fs = require('fs-extra')
const path = require('path')

let tmpPath = path.resolve(__dirname, '../tmp/changedED2s')
let tmpHeadPath = path.resolve(__dirname, '../tmp/changedED2Heads')

fs.ensureDirSync(tmpPath)
fs.ensureDirSync(tmpHeadPath)

for (let f of changeFiles) {
  let name = f+'.png'
  fs.copySync(path.resolve(__dirname, '../images/namePNGs/'+name), path.join(tmpPath, name))
  fs.copySync(path.resolve(__dirname, '../images/nameHeadPNGs/'+name), path.join(tmpHeadPath, name))
}

// Peirpha