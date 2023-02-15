const fs = require('fs/promises')

/**
const { main: <scriptName> } = require('./scripts/<scriptName>')
;(async () => <scriptName>(<params>))()

Ex: */
const { main: cdep } = require('./scripts/cdep')
;(async () => cdep({
  headless: false, // optional - defaults to true (not specific to any script)
  timeout: 0, // optional - defaults to 4 minutes (not specific to any script)
  // other params specific to each script
  timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2
}))()
/**/


// const { main: senat } = require('./scripts/senat')
// ;(async () => {
//   const output = await senat({
//     headless: false
//   })
//   console.log(output)
//   // fs.writeFile('output.json', JSON.stringify(output, null, 2))
// })()
