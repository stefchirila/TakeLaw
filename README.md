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

Scripts can be tested by adding them to the `runner.js` file, and running it with `node runner.js`.
Script execution can be stopped by pressing <kbd>Ctrl</kbd> + <kbd>C</kbd>.


## Scripts:

1. [x] Camera Deputaților: `cdep.js` (_done, **needs validation**_)
2. [ ] Senat: `senat.js` (_in progress_)
3. [ ] M Finantelor Publice
4. [ ] M Transporturilor
5. [ ] M Dezvoltării, Lucrărilor Publice și Administrației
6. [ ] M Mediului Apelor și Pădurilor
7. [ ] M Afaceri Interne
8. [ ] M Afaceri Externe
9. [ ] M Apararii Nationale
10. [ ] Monitorul Oficial
11. [ ] M Justitie
12. [ ] M Agriculturii și Dezvoltării Rurale
13. [ ] M Educatiei
14. [ ] C pentru muncă, familie şi protecţie socială
15. [ ] M Economiei
16. [ ] M Energiei
17. [ ] Secretariatul General al Guvernului SGG
18. [ ] M Investițiilor și Proiectelor Europene
19. [ ] M Antreprenoriatului și Turismului ??	Ministry of Business Environment, Trade and Entrepreneurship
20. [ ] M Sanatatii
21. [ ] M Culturii
22. [ ] M Mediului Apelor și Pădurilor
23. [ ] M Cercetării, Inovării și Digitalizării
24. [ ] Ministry of Communications and Information Society ?? 
25. [ ] M Sportului
26. [ ] M Antreprenoriatului și Turismului
27. [ ] Ministry for Romanians Everywhere ??
28. [ ] Ministry for Relations with Parliament ??
29. [ ] European Court Of Justice

