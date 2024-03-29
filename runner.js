const fs = require('fs/promises')

/**
const { main: <scriptName> } = require('./scripts/<scriptName>')
;(async () => <scriptName>(<params>))()

Ex:
*/
// const { main: cdep } = require('./scripts/cdep')
// ;(async () => {
//   const output = await cdep({
//   // Common params

//   // headless - whether to run the browser in headless mode or not
//   // optional - defaults to true (not specific to any script)
//   headless: false, 

//   // timeout - how long to wait for a page to load before timing out
//   // optional - defaults to 4 minutes (not specific to any script)
//   timeout: 0,

//   // other params specific to each script
//   timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5
//   })
//   fs.writeFile('output/cdep.json', JSON.stringify(output, null, 2))
// })()

// const { main: cdepPl } = require('./scripts/cdep-pl')
// ;(async () => {
//   const output = await cdepPl({
//     headless: true,
//     timestamp: '06-21-2023'
//   })
//   fs.writeFile('output/cdep-pl.json', JSON.stringify(output, null, 2))
// })()

// const { main: senatPl } = require('./scripts/senat-pl')
// ;(async () => {
//   const output = await senatPl({
//     headless: false
//   })
//   fs.writeFile('output/senat-pl.json', JSON.stringify(output, null, 2))
// })()

// const { main: mtransport } = require('./scripts/mtransport')
// ;(async () => {
//   const output = await mtransport({
//     headless: false
//   })
//   fs.writeFile('output/mtransport.json', JSON.stringify(output, null, 2))
// })()

// const { main: mfinante } = require('./scripts/mfinante')
// ;(async () => {
//   const output = await mfinante({
//     headless: false
//   })
//   fs.writeFile('output/mfinante.json', JSON.stringify(output, null, 2))
// })()

// const { main: mdezvoltarii } = require('./scripts/mdezvoltarii')
// ;(async () => {
//   const output = await mdezvoltarii({
//     headless: false
//   })
//   fs.writeFile('output/mdezvoltarii.json', JSON.stringify(output, null, 2))
// })()

// const { main: meducatiei } = require('./scripts/meducatiei')
// ;(async () => {
//   const output = await meducatiei({
//     headless: false
//   })
//   fs.writeFile('output/meducatiei.json', JSON.stringify(output, null, 2))
// })()

// const { main: mmediu } = require('./scripts/mmediu')
// ;(async () => {
//   const output = await mmediu({
//     headless: false
//   })
//   fs.writeFile('output/mmediu.json', JSON.stringify(output, null, 2))
// })()

// const { main: mai } = require('./scripts/mai')
// ;(async () => {
//   const output = await mai({
//     headless: false
//   })
//   fs.writeFile('output/mai.json', JSON.stringify(output, null, 2))
// })()

// const { main: mae } = require('./scripts/mae')
// ;(async () => {
//   const output = await mae({
//     headless: false
//   })
//   fs.writeFile('output/mae.json', JSON.stringify(output, null, 2))
// })()

// const { main: mjustitiei } = require('./scripts/mjustitiei')
// ;(async () => {
//   const output = await mjustitiei({
//     headless: false
//   })
//   fs.writeFile('output/mjustitiei.json', JSON.stringify(output, null, 2))
// })()

// const { main: mapn } = require('./scripts/mapn')
// ;(async () => {
//   const output = await mapn({
//     headless: false
//   })
//   fs.writeFile('output/mapn.json', JSON.stringify(output, null, 2))
// })()

// const { main: meconomiei } = require('./scripts/meconomiei')
// ;(async () => {
//   const output = await meconomiei({
//     headless: false
//   })
//   fs.writeFile('output/meconomiei.json', JSON.stringify(output, null, 2))
// })()

// const { main: menergiei } = require('./scripts/menergiei')
// ;(async () => {
//   const output = await menergiei({
//     headless: false
//   })
//   fs.writeFile('output/menergiei.json', JSON.stringify(output, null, 2))
// })()

// const { main: mturism } = require('./scripts/mturism')
// ;(async () => {
//   const output = await mturism({
//     headless: true
//   })
//   fs.writeFile('output/mturism.json', JSON.stringify(output, null, 2))
// })()

// const { main: msanatatii } = require('./scripts/msanatatii')
// ;(async () => {
//   const output = await msanatatii({
//     headless: true
//   })
//   fs.writeFile('output/msanatatii.json', JSON.stringify(output, null, 2))
// })()

// const { main: magriculturii } = require('./scripts/magriculturii')
// ;(async () => {
//   const output = await magriculturii({
//     headless: false
//   })
//   fs.writeFile('output/magriculturii.json', JSON.stringify(output, null, 2))
// })()

// const { main: mculturii } = require('./scripts/mculturii')
// ;(async () => {
//   const output = await mculturii({
//     headless: false
//   })
//   fs.writeFile('output/mculturii.json', JSON.stringify(output, null, 2))
// })()

// const { main: msport } = require('./scripts/msport')
// ;(async () => {
//   const output = await msport({
//     headless: false
//   })
//   fs.writeFile('output/msport.json', JSON.stringify(output, null, 2))
// })()

// const { main: minvestitiilor } = require('./scripts/minvestitiilor')
// ;(async () => {
//   const output = await minvestitiilor({
//     headless: false
//   })
//   fs.writeFile('output/minvestitiilor.json', JSON.stringify(output, null, 2))
// })()

// const { main: mfamiliei } = require('./scripts/mfamiliei')
// ;(async () => {
//   const output = await mfamiliei({
//     headless: false
//   })
//   fs.writeFile('output/mfamiliei.json', JSON.stringify(output, null, 2))
// })()

// const { main: mmuncii } = require('./scripts/mmuncii')
// ;(async () => {
//   const output = await mmuncii({
//     headless: false
//   })
//   fs.writeFile('output/mmuncii.json', JSON.stringify(output, null, 2))
// })()

// const { main: mcercetarii } = require('./scripts/mcercetarii')
// ;(async () => {
//   const output = await mcercetarii({
//     headless: false
//   })
//   fs.writeFile('output/mcercetarii.json', JSON.stringify(output, null, 2))
// })()