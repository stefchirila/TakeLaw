const {
  defaultTimeout,
  getDocumentType,
  setup,
  teardown
} = require('./helpers')

const main = async ({
  headless = true,
  timeout = defaultTimeout,
}) => {
  const timerName = "MFinante took"
  console.info("Starting MFinante script...")
  console.time(timerName)
  const docCounter = {}
  const { page } = await setup({
    headless,
    timeout
  })
  const output = {
    mfinante: []
  }
  const baseUrl = 'https://mfinante.gov.ro'
  const pagePrefix = `https://mfinante.gov.ro/ro/acasa/transparenta/proiecte-acte-normative
?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_Bg185RyrkUe4
&p_p_lifecycle=0
&p_p_state=normal
&p_p_mode=view
&_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_Bg185RyrkUe4_delta=20
&p_r_p_resetCur=false
&_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_Bg185RyrkUe4_cur=`

  await page.goto('https://mfinante.gov.ro/ro/acasa/transparenta/proiecte-acte-normative')
  console.info(`Navigated to ${page.url()} to fetch page count`)
  const pageCount = Number((
      await page.locator('a.dropdown-toggle.direction-down.max-display-items-15.btn.btn-secondary').innerText()
    ).replace('Pagina 1 a ', '')
  )
  
  const pageIndices = [...Array(pageCount).keys()].map(i => i + 1)
  for await (const pageIndex of pageIndices) {
    await page.goto(`${pagePrefix}${pageIndex}`)
    console.info(`\t Navigated to ${page.url()} to fetch documents\n`)
  
    try {
      for await (const section of await page.locator('.asset-content.row').all()) {
        const date = await section.locator('.asset-title').innerText()
        let sectionContent = section.locator('span:not(.asset-title) p:first-child')
        if (!await sectionContent.count()) {
          sectionContent = section.locator('span:not(.asset-title)')
        }
        const paragraphHTML = await sectionContent.innerHTML()
        for await (const item of paragraphHTML.split('<br>')) {
          const text = item
            .replaceAll(/<img.*?>/g, '')
            .replaceAll(/<a title="Open this document with ReadSpeaker docReader".*?>.*<\/a>/g, '')
          const linkParts = text.replaceAll(`\n`, '').match(/<a.*?href="(.*?)".*?>.*?<\/a>/)
          const link = (linkParts && linkParts[1] && linkParts[1].trim()) ?? null
          if (!link) {
            console.info('-------------------')
            console.info('Bad link found at in paragraph', text)
            console.info('Continuing...')
            console.info('-------------------')
            continue
          }
          const textWithoutLink = (text.includes('href="')
            ? text.replaceAll(/<a.*?>/g, '')
                .replaceAll(/<\/a>/g, '')
            : text).trim()
  
          if (date && link && textWithoutLink) {
            const type = getDocumentType(link)
            if (!docCounter[type]) {
              docCounter[type] = 0
            }
            docCounter[type] += 1

            output.mfinante.push({
              currentUrl: page.url(),
              date: date.replaceAll('.', '-'),
              link: `${baseUrl}${encodeURI(link)}`,
              name: textWithoutLink,
              type,
            })
          }
        }
        
      }
    } catch(e) {
      console.info('-------------------')
      console.info('Error while parsing page content:')
      console.error(e)
      console.info('Continuing...')
      console.info('-------------------')
    }
  }
  
  await teardown()
  console.timeEnd(timerName)
  if (!output.mfinante.length) {
    console.info(`Found ${output.mfinante.length} items out of which`)
    const docTypesCount = Object.keys(docCounter).length
    Object.entries(docCounter).forEach(([type, count], index) => {
      console.info(`\t${count} are ${type.toUpperCase()}${
        index === docTypesCount - 1
          ? '.'
          : (index === docTypesCount - 2 ? ' and' : ',')
      }`)
    })
  } else {
    console.info('Found no items. Something must have gone wrong. 😔')
  }

  return output
}

module.exports = {
  main
}
