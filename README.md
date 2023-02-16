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

1. [x] [Camera Deputaților](https://www.cdep.ro/pls/caseta/eCaseta2015.OrdineZi?idl=1) - `cdep.js` (_done, **needs validation**_)
1. [ ] [Senat](https://www.senat.ro/ProgramLucruZi.aspx?Zi&ComisieID=587d586c-13fa-4bf6-8dbb-9fc3617dbdf4): `senat.js` (_in progress_)
1. [ ] [M Finantelor Publice](https://mfinante.gov.ro/ro/acasa/transparenta/proiecte-acte-normative)
1. [ ] [M Transporturilor](https://www.mt.ro/web14/transparenta-decizionala/consultare-publica/acte-normative-in-avizare)
1. [ ] [M Dezvoltării, Lucrărilor Publice și Administrației](https://www.mdlpa.ro/pages/actenormativecaractergeneral)
1. [ ] M Mediului Apelor și Pădurilor
1. [ ] M Afaceri Interne
1. [ ] M Afaceri Externe
1. [ ] M Apararii Nationale
1. [ ] Monitorul Oficial
1. [ ] M Justitie
1. [ ] M Agriculturii și Dezvoltării Rurale
1. [ ] M Educatiei
1. [ ] C pentru muncă, familie şi protecţie socială
1. [ ] M Economiei
1. [ ] M Energiei
1. [ ] Secretariatul General al Guvernului SGG
1. [ ] M Investițiilor și Proiectelor Europene
1. [ ] M Antreprenoriatului și Turismului ??	Ministry of Business Environment, Trade and Entrepreneurship
1. [ ] M Sanatatii
1. [ ] M Culturii
1. [ ] M Mediului Apelor și Pădurilor
1. [ ] M Cercetării, Inovării și Digitalizării
1. [ ] Ministry of Communications and Information Society ?? 
1. [ ] M Sportului
1. [ ] M Antreprenoriatului și Turismului
1. [ ] Ministry for Romanians Everywhere ??
1. [ ] Ministry for Relations with Parliament ??
1. [ ] European Court Of Justice
