# Changelog


## [0.5] - 2023-08-31

### Fixed
- Fixed `magriculturi` because people can't be consistent
- Fixed `msport`

## [0.4.2] - 2023-08-09

### Changed
- Changed `mapn`, `minvestitiilor`, `mdezvoltarii`, `msport` scripts to limit the amount of results and to gracefully exit

## [0.4.1] - 2023-08-03

### Changed
- Changed `mcercetarii`, `mjustitiei`, `mdezvoltarii` scripts to limit the amount of results and to gracefully exit
- Changed `defaultTimeout` from 4 minutes to 3 minutes

## [0.4.0] - 2023-08-02

### Changed

- Added retry mechanism to initial webpage load on all scripts

## [0.3.2] - 2023-07-31

### Changed
- Updated dependencies versions

## [0.3.1] - 2023-07-31

### Changed
- Lowered the limits on some scripts to avoid timeouts
- Added `--disable-http2` start argument to playwright browser context launch options
- Added MS Edge user agent to playwright browser context launch options

## [0.3.0] - 2023-07-31

### Changed
- Added `ignoreHTTPSErrors` to playwright browser context launch options
- Added `throwIfNotOk` helper and used it in all scripts

## [0.2.8] - 2023-06-26

### Fixed
- Fixed `meconomiei` script to remove erroneous params sent to setup

## [0.2.7] - 2023-06-18

### Changed
- Updated dependencies versions

## [0.2.6] - 2023-06-18

### Added
- Added `mmuncii` script
- Added `mcercetarii` script

## [0.2.5] - 2023-06-17

### Added
- Added `mfamiliei` script
- Added `minvestitiilor` script

## [0.2.4] - 2023-06-11

### Added
- Added `msport` script

## [0.2.3] - 2023-06-11

### Added
- Added `mculturii` script

## [0.2.2] - 2023-06-11

### Added
- Added `magriculturii` script

## [0.2.1] - 2023-06-10

### Added
- Added `msanatatii` script

### Changed
- Updated package version
- Removed unneeded import from `mturism` script

## [0.2.0] - 2023-06-10

### Added
- Added `mturism` script

## [0.1.2] - 2023-04-19

### Changed
- Updated `cdep-pl` script to accept a `timestamp` param

## [0.1.1] - 2023-04-19

### Added
- Added `senat-pl` script

## [0.1.0] - 2023-04-18

### Added
- Added `cdep-pl` script

## [0.0.9] - 2023-04-02

### Added
- Added `menergiei` script

## [0.0.8] - 2023-04-02

### Added
- Added `meconomiei` script

## [0.0.7] - 2023-04-01

### Added
- Added `mae` script
- Added `mjustitiei` script
- Added `mapn` script

## [0.0.6] - 2023-03-25

### Added
- Added `mai` script

## [0.0.5] - 2023-03-13

### Added
- Added `mmediu` script

### Changed
- Added `7z` to the list of documents recognized to be archives

## [0.0.4] - 2023-03-12

### Changed
- Moved output files to their own directory

### Fixed
- Fixed `meducatiei` script to correctly output its report

## [0.0.3] - 2023-03-12

### Added
- Added `meducatiei` script, that fetches documents only for the current year, as archives are not consistent

## [0.0.2] - 2023-03-11

### Changed
- Updated `mdezvoltarii` script to gracefully exit when encountering a general error
- Removed empty documents from `mdezvoltarii` script output

## [0.0.1] - 2023-03-11

### Added
- `CHANGELOG.md` file
- `package.json` version

### Changed
- Finished `mdezvoltarii` script
- Updated all finished scripts (`cdep`, `mfinante`, `mtransport`) to output the same format
- Updated all finished scripts (same as above) to display the same output report format