const { setup, teardown } = require('./helpers')

const main = async () => {
  const timerName = 'CDEP took'
  console.time(timerName)
  let pdfsCount = 0
  const page = await setup({ timeout: 0 })
  const output = {
    camera_deputatilor: []
  }
  const iframeTriggerPrefix = 'javascript:loadintoIframe('
  const baseUrl = 'https://www.cdep.ro'
  await page.goto('https://www.cdep.ro/pls/caseta/eCaseta2015.OrdineZi')

  await page.getByLabel('dismiss cookie message').click()

  const visibleRows = page.locator('.grup-parlamentar-list.grupuri-parlamentare-list table').locator('tbody tr:not([style])')

  for await (const row of await visibleRows.all()) {
    const toggleFrameTrigger = row.locator(`a[href^="${iframeTriggerPrefix}"]`)

    if (await toggleFrameTrigger.count()) {
      const [frameId, frameUrl] =
        (await toggleFrameTrigger.getAttribute('href'))
          .replace(iframeTriggerPrefix, '')
          .replace(/'|\)/g, '')
          .split(', ')
      await toggleFrameTrigger.click()
      await page.waitForSelector(`iframe#frame${frameId}[src^="${frameUrl}"]:visible`)
      await page.waitForResponse(response => response.url().endsWith(frameUrl))
      await page.waitForLoadState('networkidle')
      const frame = page.frameLocator(`iframe#frame${frameId}[src^="${frameUrl}"]`)
      const pdfRows = frame.locator('tr[align="center"][valign="top"]')
      const frameOutput = {
        lawProject: {
          name: await frame.locator('tr[bgcolor="#e0e0e0"] b').textContent(),
          pdf: []
        }
      }
      for await (const row of await pdfRows.all()) {
        const pdfLink = row.locator('a[target="PDF"]')
        if (await pdfLink.count()) {
          const pdfPath = encodeURI(await pdfLink.getAttribute('href'))
          frameOutput.lawProject.pdf.push({
            date: (await row.locator('> td:first-child:not([align])').textContent()).trim().replace(/&nbsp;/g, ''),
            link: pdfPath.startsWith(baseUrl) ? pdfPath : `${baseUrl}${pdfPath}`,
            name: (await row.locator('> td:nth-child(2)').textContent()).trim()
          })
          pdfsCount += 1
        }
      }
      output.camera_deputatilor.push(frameOutput)
    }
  }
  await teardown()
  console.timeEnd(timerName)
  console.info(`Found ${pdfsCount} PDFs`)
  return output
}

// (async () => await main())()

module.exports = main
