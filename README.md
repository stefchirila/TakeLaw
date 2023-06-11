# TakeLaw 📖

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Playwright](https://playwright.dev/)

## Setup

- Clone the repo
- Install [the latest LTS Node.js version for your OS](https://nodejs.org/en/download/)
- Install [pnpm globally](https://pnpm.io/installation)
- Install dependencies by running the following command in the root of the project in your terminal of choice (e.g. bash, PowerShell, zsh, etc)
  ```bash
  pnpm install
  ```

## Usage

Each script exports an async `main` function, that needs to be awaited:
```js
const { main: scriptName } = require('./scripts/<scriptName>.js');

const output = await main();
// OR, as a promise:
main().then(output => ...);
```
Don't forget to pass any optional and required params to the `main` function.

Scripts can be tested by adding them to the `runner.js` file, and running it with `pnpm runner`.

If you want to see the debug information for a script which has been previously added to `runner.js`, you can run it with `pnpm debug`.

Script execution can be stopped by pressing <kbd>Ctrl</kbd> + <kbd>C</kbd>.


## Scripts:

1. [x] [Camera Deputaților](https://www.cdep.ro/pls/caseta/eCaseta2015.OrdineZi?idl=1) - `cdep.js` (_done, **requires validation**_) 
    - fetches documents based on the provided timestamp
    - requires a `timestamp` param, which is the JS UNIX timestamp corresponding to the date of the page to be parsed
1. [x] [Camera Deputaților - detailed](https://www.cdep.ro/pls/caseta/eCaseta2015.OrdineZi) - `cdep-pl.js` (_done, **requires validation**_)
    - fetches details about each PL-X from the current plenary session
    - requires a `timestamp` param, which is the JS UNIX timestamp corresponding to the date of the page to be parsed
1. [x] ~~[Senat](https://www.senat.ro/ProgramLucruZi.aspx?Zi&ComisieID=587d586c-13fa-4bf6-8dbb-9fc3617dbdf4): `senat.js` (_in progress_)~~ **NO LONGER NEEDED - SEE `senat-pl.js`**
1. [x] [Senat - detailed](https://www.senat.ro/): `senat-pl.js` (_done, **requires validation**_)
    - fetches details about each subject from the current plenary session & all committee sessions
1. [x] [M Finantelor Publice](https://mfinante.gov.ro/ro/acasa/transparenta/proiecte-acte-normative) - `mfinante.js` (_done, **requires validation**_)
    - fetches all documents from the entire history using the pagination
1. [x] [M Transporturilor](https://www.mt.ro/web14/transparenta-decizionala/consultare-publica/acte-normative-in-avizare) - `mtransporturi.js` (_done, **requires validation**_)
    - fetches documents based on params
    - requires a `limitPerPage` param (which will be used to limit the number of rows displayed on the table page)
    - requires a `maxResults` param (which will be used to limit the number of results fetched)
    - **VERY IMPORTANT**: provide the `limitPerPage` and `maxResults` params and, optionally, the `timeout` param as follows:
      ```ts
      const output = await main({
        limitPerPage: 20, // default: 50
        maxResults: 200, // default: 100
        timeout: 2 * 60 * 1000, // default: 4 * 60 * 1000 (4 minutes)
      })
      ```
1. [x] [M Dezvoltării, Lucrărilor Publice și Administrației](https://www.mdlpa.ro/pages/actenormativecaractergeneral) - `mdezvoltarii.js` (_done, **requires validation**_)
   - fetches all documents for the entire history using the archive links
   - requires a `maxResults` param (which will be used to limit the number of results fetched)
   - **VERY IMPORTANT**: provide the `maxResults` param and, optionally, the `timeout` param as follows:
     ```ts
     const output = await main({
       maxResults: 300, // default: 200
       timeout: 2 * 60 * 1000, // default: 4 * 60 * 1000 (4 minutes)
     })
     ```
     otherwise the script might take more than 5 minutes to finish (experimented locally it took ~8 minutes to parse and fetch all the documents, current year + archived years)
1. [x] [M Educatiei](https://www.edu.ro/proiecte-acte-normative) ~~+ [archives](https://www.edu.ro/transparen%C8%9B%C4%83-institu%C8%9Bional%C4%83)?~~ (_done, **requires validation**_)
1. [x] [M Mediului Apelor și Pădurilor](http://www.mmediu.ro/categorie/proiecte-de-acte-normative/41) (_done, **requires validation**_)
    - fetches all documents for the entire history using the pagination links
    - requires a `maxPages` param (which will be used to limit the number of pages to be parsed)
    - **VERY IMPORTANT**: provide the `maxPages` param and, optionally, the `timeout` param as follows:
      ```ts
      const output = await main({
        maxPages: 5, // default: 10
        timeout: 2 * 60 * 1000, // default: 4 * 60 * 1000 (4 minutes)
      })
      ```
1. [x] [M Afaceri Interne](https://www.mai.gov.ro/informatii-publice/transparenta-decizionala/) (_done, **requires validation**_)
1. [x] [M Afaceri Externe](https://www.mae.ro/node/2011) (_done, **requires validation**_)
1. [x] [M Justitie](https://www.just.ro/informatii-de-interes-public/acte-normative/proiecte-in-dezbatere/) (_done, **requires validation**_)
1. [x] [M Apararii Nationale](https://sg.mapn.ro/transparenta) (_done, **requires validation**_)
1. [x] [M Economiei](https://economie.gov.ro/proiecte-de-acte-normative-aflate-in-consultare-publica/) (_done, **requires validation**_)
1. [x] [M Energiei](https://energie.gov.ro/category/transparenta-institutionala/transparenta-decizionala/) (_done, **requires validation**_)
1. [x] [M Antreprenoriatului și Turismului](https://turism.gov.ro/web/category/consultare-publica/) (_done, **requires validation**_)
1. [x] [M Sanatatii](https://www.ms.ro/ro/transparenta-decizionala/acte-normative-in-transparenta/) (_done, **requires validation**_)
1. [x] [M Agriculturii și Dezvoltării Rurale](https://www.madr.ro/proiecte-de-acte-normative.html/) (_done, **requires validation**_)
    - because M Agriculturii has more than 145 pages of documents, at the time of writing, the script requires a `maxLinksCount` parameter (which will be used to limit the number of articles to be parsed) - currently set to 250
1. [x] [M Culturii](http://www.cultura.ro/proiecte-acte-normative/) (_done, **requires validation**_)
    - because M Culturii has a big number of article links on the same page, the script requires a `maxLinksCount` parameter (which will be used to limit the number of articles to be parsed) - currently set to 100
1. [ ] [M Sportului](https://sport.gov.ro/proiecte-legislative-in-dezbatere-publica/)
2. [ ] [M Investițiilor și Proiectelor Europene](https://mfe.gov.ro/informatii-de-interes-public/acte-normative-in-consultare-publica/)
1. [ ] [M Familiei, Tineretului si Egalitatii de sanse](https://mfamilie.gov.ro/1/proiecte-de-acte-normative-2/)
1. [ ] [M Muncii și Solidarității Sociale](https://mmuncii.ro/j33/index.php/ro/transparenta/proiecte-in-dezbatere)
1. [ ] [M Cercetării, Inovării și Digitalizării](https://www.mcid.gov.ro/transparenta-decizionala-2/)
1. [ ] [Monitorul Oficial](https://monitoruloficial.ro/e-monitor/)
4. [ ] Secretariatul General al Guvernului SGG
5. [ ] European Court Of Justice
8. [ ] Ministry for Romanians Everywhere ??
9. [ ] Ministry for Relations with Parliament ??
