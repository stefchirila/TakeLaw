const assert = require('node:assert');
const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    timeout: 0,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.cdep.ro/pls/caseta/eCaseta2015.OrdineZi');
  await page.getByLabel('dismiss cookie message').click()
  const visibleRows = page.locator('.grup-parlamentar-list.grupuri-parlamentare-list table').locator('tbody tr:not([style])');
  // Toggle all frames and patiently wait for them to load
  for await (const row of await visibleRows.all()) {
    const toggleFrameTrigger = row.locator('a[href^="javascript:loadintoIframe"]')
    if (await toggleFrameTrigger.count()) {
      await toggleFrameTrigger.click()
      await page.waitForSelector('iframe[src^="/pls/caseta"]:visible')
    }
  }
  const frames = page.mainFrame().childFrames()
  for await (const frame of frames) {
    const frameUrl = frame.url()
    if (frameUrl.endsWith('blank.html')) {
      continue
    } else {
      // got the frame, continue from here
      await frame.waitForLoadState('networkidle')
      console.log(frameUrl)
    }
  }
  
  
  await page.waitForTimeout(1000000);
  await context.close();
  await browser.close();
})()