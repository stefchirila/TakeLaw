const {
  defaultTimeout,
  getDocumentType,
  getMonthFromROString,
  outputReport,
  setup,
  teardown
} = require('./helpers')

const main = async ({
  headless = true,
  limitPerPage = 20,
  maxResults = 40,
  timeout = defaultTimeout,
}) => {
  const timer = Date.now()
  const timerName = "MTransport took"
  console.info("Starting MTransport script...")
  console.info('-------------------')
  console.time(timerName)
  const docCounter = {}
  const { page } = await setup({
    headless,
    timeout
  })
  const output = {
    mtransport: []
  }
  await page.route('**/*', (route) =>
    route.request().resourceType() === 'image' ||
    route.request().url().endsWith('.css') ||
    route.request().url().includes('stylesheet?id')
      ? route.abort()
      : route.continue()
  )  
  const baseUrl = 'https://www.mt.ro'
  const rootUrl = `https://www.mt.ro/web14/transparenta-decizionala/consultare-publica/acte-normative-in-avizare?limit=${limitPerPage}&start=0`
  const response = await page.goto(rootUrl)
  if (response.status() === 503) {
    await page.goto(rootUrl)
  }
  let rowCounter = 0
  let pageCounter = 0
  const cookieAcceptButton = page.locator('button.btn.btn-primary.jb.accept.blue')
  if (await cookieAcceptButton.count()) {
    await cookieAcceptButton.click()
  }
  
  const table = page.locator('table.category.table.table-striped.table-bordered.table-hover')
  const rows = []
  do {
    await page.waitForLoadState('networkidle')
    console.info(`Navigated to ${page.url()}. This might take some time as the site is fetching up to ${limitPerPage} items from its database.`)
    console.info('-------------------')
    for await (const row of await table.locator('tbody tr').all()) {
      const nameCell = row.locator('td.list-title')
      const dateParts = (await row.locator('td.list-date.small').textContent()).trim().split(' ')
      rows.push({
        name: (await nameCell.textContent()).trim(),
        date: `${dateParts[0]}-${getMonthFromROString(dateParts[1])}-${dateParts[2]}`,
        nameLink: (await nameCell.locator('a').getAttribute('href')).trim()
      })
      rowCounter += 1
    }
    const nextPageLink = page.locator('a').filter({
      hasText: 'Mai departe'
    })
    if (rowCounter >= maxResults) {
      console.info(`Reached maximum rows limit of ${maxResults}, stop fetching rows...`)
      console.info('-------------------')
      break
    }
    if (await nextPageLink.count()) {
      pageCounter += 1
      await nextPageLink.click()
    } else {
      break;
    }
  } while (true) 
  
  let resultsCounter = 0;
  let documentCounter = 0;
  for (const row of rows) {
    await page.goto(`${baseUrl}${row.nameLink}`)
    docs = page.locator('a[href^="/web14/documente/acte-normative"]')
    if (!await docs.count()) {
      console.info(`No documents found for ${row.name} (${row.nameLink}), skipping...`)
      console.info('-------------------')
      continue
    }
    pageCounter += 1
    const documents = []
    for await (const doc of await docs.all()) {
      const docLink = `${baseUrl}${await doc.getAttribute('href')}`
      const docTitle = (await doc.textContent()).trim()
      const docType = getDocumentType(docLink)
      if (!docCounter[docType]) {
        docCounter[docType] = 0
      }
      docCounter[docType] += 1
      documentCounter += 1
      documents.push({
        date: row.date,
        link: docLink,
        title: docTitle,
        type: docType
      })
    }
    output.mtransport.push({
      currentUrl: page.url(),
      date: row.date,
      name: row.name,
      documents,
    })
    resultsCounter += 1
    console.info(`Parsing page #${resultsCounter} out of ${rows.length}...`)
    console.info('-------------------')
    if (resultsCounter >= maxResults) {
      console.info(`Reached maximum results limit of ${maxResults}, stop accessing pages to fetch documents...`)
      console.info('-------------------')
      break
    }
    if (Date.now() - timer > timeout) {
      console.info(`Reached timeout limit of ${timeout}ms, stop fetching documents and gracefully exit`)
      console.info('-------------------')
      break
    }
  }

  await teardown()
  console.timeEnd(timerName)
  outputReport(output.mtransport, docCounter, documentCounter, pageCounter)

  return output
}

module.exports = {
  main
}