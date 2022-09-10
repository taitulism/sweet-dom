[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/taitulism/<dom-lib>.svg?branch=master)](https://travis-ci.org/taitulism/<dom-lib>)

First Thing's First
===================
Rename all TPL strings:
* package.json
* README.md
* src/tpl.ts (use vs-code refactor)
* src/index.ts
* rollup.prod.config.js
* playground/playground.ts
* playground/playground.html
* tests/spec.html
* tests/index.spec.ts
* tests/api.spec.ts

&nbsp;

Development
===========

Browser Playground / Tests
--------------------------
1. `npm run dev`
2. Open file in the browser:
	* `<PATH_TO>/playground/playground.html` 
	* `<PATH_TO>/tests/spec.html`

&nbsp;

TDD
---
`npm run karma` (Headless by default)
> Karma doesn't work on WSL

&nbsp;

Check Stuff
-----------
* `lint`     - Eslint check issues
* `test`     - Karma test (for build)
* `check`    - lint + test
> Karma doesn't work on WSL

&nbsp;

Publish a new version
---------------------
1.
	```sh
	$ npm version major|minor|patch
	```  
	triggers:

	* `preversion`  - Runs the npm `check` script
	* `postversion` - Git push + tags

2.
	```sh
	$ npm publish
	``` 
	triggers:

	* `prepublishOnly` - Runs the `build`
		* `prebuild`  - Delete `"dist"` folder
		* `build`     - Rollup build for production
		* `postbuild` - Delete temporary declaration folder inside `"dist"`




