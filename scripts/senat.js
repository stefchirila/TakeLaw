const {
  defaultTimeout,
  setup,
  teardown
} = require('./helpers')

const main = async ({
  headless = true,
  timeout = defaultTimeout
}) => {
  const timerName = 'SENAT took'
  console.log('Starting SENAT script...')
  console.time(timerName)
  let pdfCount = 0
  const { context, page } = await setup({
    headless,
    timeout
  })
  const output = {
    senat: []
  }
  const postBackLink = 'a[href^="javascript:__doPostBack"]'
  const mainUrl = 'https://www.senat.ro/default.aspx?Sel=F1DE4E8D-E4E0-4847-B6FD-C63A05EC1F2A'
  await page.goto(mainUrl)
  console.log(`Navigated to ${page.url()}`)
  await page.locator('a[onclick^="hideWarning()"]').click()
  const table = page.locator('table.ProgramLucruGrid')
  const rows = table.locator('tbody tr')
  let i = 0;
  for await (const row of await rows.all()) {
    console.log(await rows.count(), i++)
    const rowLinks = row.locator(postBackLink)
    if (!await rowLinks.count()) {
      continue
    }
    const loadPostBack = page.waitForResponse(response =>
      response.url() === mainUrl &&
      response.request().method() === 'POST'
    )
    await rowLinks.click()
    await loadPostBack
    console.log(await rows.count())
  }
  await teardown()
  console.timeEnd(timerName)
  console.info(`Found ${pdfCount} PDFs. Exiting...`)
  return output
}

module.exports = {
  main
}