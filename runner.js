const fs = require('fs/promises')

/**
const { main: <scriptName> } = require('./scripts/<scriptName>')
(async () => <scriptName>(<customParams>))()

Ex:
const { main: cdep } = require('./scripts/cdep')
(async () => cdep({
  timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2
})()
*/

const { main: cdep } = require('./scripts/cdep')

;(async () => {
  const output = await cdep({
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2 
  })
  fs.writeFile('output.json', JSON.stringify(output, null, 2))
})()