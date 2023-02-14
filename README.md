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
1. [ ] Senat: `senat.js` (_in progress_)
1. [ ] ...

