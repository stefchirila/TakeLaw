const { chromium } = require('playwright')

/** @type {import('playwright').Browser} */
let browser
/** @type {import('playwright').BrowserContext} */
let context
/** @type {import('playwright').Page} */
let page

const defaultTimeout = 4 * 60 * 1000

const setup = async ({
  headless = true,
  timeout = defaultTimeout
} = {}) => {
  browser = await chromium.launch({
    headless,
    timeout
  })
  context = await browser.newContext()
  page = await context.newPage()
  return {
    context,
    page
  }
}

const teardown = async (waitForMs = 0) => {
  await page.waitForTimeout(waitForMs)
  await context.close()
  await browser.close()
}

const getDate = (timestamp = Date.now()) => {
  const date = new Date(timestamp)
  const dateParts = date.toISOString().split('T')[0].split('-')
  return `${dateParts[0]}${dateParts[1]}${dateParts[2]}`
}

const getDocumentType = (url) => {
  const urlParts = url.split('.')
  switch (urlParts[urlParts.length - 1].toLowerCase()) {
    case 'pdf':
      return 'pdf'
    case 'doc':
    case 'docx':
      return 'doc'
    case 'xls':
    case 'xlsx':
      return 'xls'
    case 'rar':
    case 'zip':
      return 'archive'
    default:
      return 'unknown'
  }
}

module.exports = {
  defaultTimeout,
  getDate,
  getDocumentType,
  setup,
  teardown
}
