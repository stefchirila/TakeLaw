const fs = require('fs/promises')

/**
const { main: <scriptName> } = require('./scripts/<scriptName>')
;(async () => <scriptName>(<params>))()

Ex:
const { main: cdep } = require('./scripts/cdep')

;(async () => cdep({
  // Common params

  // headless - whether to run the browser in headless mode or not
  // optional - defaults to true (not specific to any script)
  headless: false, 

  // timeout - how long to wait for a page to load before timing out
  // optional - defaults to 4 minutes (not specific to any script)
  timeout: 0,

  // other params specific to each script
  timestamp: Date.now() - 1000 * 60 * 60 * 24
}))()
*/

const { main: mfinante } = require('./scripts/mfinante')
;(async () => {
  const output = await mfinante({
    headless: false
  })
  fs.writeFile('output.json', JSON.stringify(output, null, 2))
})()

// const { main: senat } = require('./scripts/senat')
// ;(async () => {
//   const output = await senat({
//     headless: false
//   })
//   console.log(output)
//   // fs.writeFile('output.json', JSON.stringify(output, null, 2))
// })()
