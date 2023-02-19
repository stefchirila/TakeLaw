const {
  defaultTimeout,
  getDocumentType,
  getMonthFromROString,
  setup,
  teardown
} = require('./helpers')

const main = async ({
  headless = true,
  limitPerPage = 50,
  maxResults = 100,
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
  const baseUrl = 'https://www.mt.ro'
  await page.goto(`https://www.mt.ro/web14/transparenta-decizionala/consultare-publica/acte-normative-in-avizare?limit=${limitPerPage}&start=0`)
  let rowCounter = 0
  const cookieAcceptButton = page.locator('button.btn.btn-primary.jb.accept.blue')
  if (await cookieAcceptButton.count()) {
    await cookieAcceptButton.click()
  }
  
  const table = page.locator('table.category.table.table-striped.table-bordered.table-hover')
  const rows = []
  let pageCounter = 0
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
  for (const row of rows) {
    await page.goto(`${baseUrl}${row.nameLink}`)
    docs = page.locator('a[href^="/web14/documente/acte-normative"]')
    if (!await docs.count()) {
      console.info(`No documents found for ${row.name} (${row.nameLink}), skipping...`)
      console.info('-------------------')
      continue
    }
    const documents = []
    for await (const doc of await docs.all()) {
      const docLink = `${baseUrl}${await doc.getAttribute('href')}`
      const docTitle = (await doc.textContent()).trim()
      const docType = getDocumentType(docLink)
      if (!docCounter[docType]) {
        docCounter[docType] = 0
      }
      docCounter[docType] += 1
      documents.push({
        link: docLink,
        title: docTitle,
        type: docType
      })
    }
    output.mtransport.push({
      currentUrl: page.url(),
      name: row.name,
      date: row.date,
      documents,
    })
    resultsCounter += 1
    console.log(`Found ${resultsCounter} out of ${rows.length} documents...`)
    if (resultsCounter >= maxResults) {
      console.info(`Reached maximum results limit of ${maxResults}, stop fetching documents...`)
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
  console.info(`Found ${output.mtransport.length} items out of which`)
  const docTypesCount = Object.keys(docCounter).length
  Object.entries(docCounter).forEach(([type, count], index) => {
    console.info(`\t${count} are ${type.toUpperCase()}${
      index === docTypesCount - 1
        ? '.'
        : (index === docTypesCount - 2 ? ' and' : ',')
    }`)
  })   

  return output
}

module.exports = {
  main
}