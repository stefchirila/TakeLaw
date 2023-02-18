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

const getMonthFromROString = (month) => {
  switch (month.toLowerCase()) {
    case 'ianuarie':
    case 'ian':
      return '01'
    case 'februarie':
    case 'feb':
      return '02'
    case 'martie':
    case 'mar':
      return '03'
    case 'aprilie':
    case 'apr':
      return '04'
    case 'mai':
      return '05'
    case 'iunie':
    case 'iun':
      return '06'
    case 'iulie':
    case 'iul':
      return '07'
    case 'august':
    case 'aug':
      return '08'
    case 'septembrie':
    case 'sept':
      return '09'
    case 'octombrie':
    case 'oct':
      return '10'
    case 'noiembrie':
    case 'noi':
      return '11'
    case 'decembrie':
    case 'dec':
      return '12'
    default:
      return '00'
  }
}

const getDocumentType = (url) => {
  const urlParts = url.split('.')
  switch (urlParts[urlParts.length - 1].toLowerCase()) {
    case 'pdf':
      return 'pdf'
    case 'doc':
    case 'docx':
    case 'odt':
    case 'odm':
      return 'doc'
    case 'xls':
    case 'xlsx':
    case 'ods':
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
  getMonthFromROString,
  setup,
  teardown
}
