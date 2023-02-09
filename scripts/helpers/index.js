const { chromium } = require('playwright')

/** @var Browser  */
let browser
/** @var BrowserContext */
let context
/** @var Page */
let page

const defaultTimeout = 120 * 1000

const setup = async ({ headless = true, timeout = defaultTimeout }) => {
  browser = await chromium.launch({
    headless,
    timeout
  })
  context = await browser.newContext()
  page = await context.newPage()
  return page
}
const teardown = async (waitForMs = 0) => {
  await page.waitForTimeout(waitForMs)
  await context.close()
  await browser.close()
}

module.exports = {
  setup,
  teardown
}
