[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/taitulism/<dom-lib>.svg?branch=master)](https://travis-ci.org/taitulism/<dom-lib>)


dom-lib
=======
A thin DOM wrapper to make common vanilla operations a bit more convenient.

* [Element Creation](#element-creation)
* [Element Selection](#element-selection)
* [Event Binding](#event-binding)
* [DOM Manipulation](#dom-manipulation)


Element Creation
----------------
### `createElm(selector, attributes, content)`
### Return: HTMLElement

### **selector** - Required
A string descriptor of an element. Supports a tag-name, an ID and classnames of the following format:
```js
'tag#id.classname1.classname2'
```

Example:
```js
const selector = 'input#first-name.form-field.required-field';

createElm(selector)
// <input id="first-name" classname="form-field required-field" />
```

### **attributes**
An object whose properties will be set as the element attributes.
Two special keys are `style` and `data` which expected to be objects. The `style` object is to set inline style properties and the `data` is for data-attributes.

Example:
```js
const selector = 'input';
const attributes = {
  type: 'text',
  style: {
    margin: '5px',
  },
  data: {
    something: 'yes'
  }
}

createElm(selector, attributes)
// <input type="text" style="margin: 5px;" data-something="yes" />
```

### **content**
The element content. Could be either a string, an element or an array of elements.
Example:
```js
const selector = 'button';
const content = 'Click';

createElm(selector, content)
// <button>Click</button>
```


Element Selection
-----------------
* **`$`** - A shortcut for `document.querySelector()`
* **`$$`** - A shortcut for `document.querySelectorAll()`
* **`$id`** - A shortcut for `document.getElementById()`
* **`$class`** - A shortcut for `document.getElementsByClassName()`
* **`$tag`** - A shortcut for `document.getElementsByTagName()`

> The methods that return multiple elements, `$$`, `$class`, `$tag` - returns an array of elements instead of live-collections or node-lists.

> All methods except `$id` also accepts a second argument: the context element to query (the default is `document`).


Event Binding
-------------
* **`bindEvent`**
* **`bindEventOnce`**

A wrapper around `addEventListener()`.
### Return: remove-listener function

Example:
```js
const unBindClick = bindEvent(elm, 'click', (ev) => {...});
```


DOM Manipulation
----------------
For placing elements.

**`put(elm)`**
* **`.before(anotherElm)`**
* **`.after(anotherElm)`**
* **`.inside(parent, childIndex, withNodes)`**

Examples:

`.before(anotherElm)`
```js
put(elmA).before(elmB)

// <elmA>
// <elmB>
```

`.after(anotherElm)`
```js
put(elmA).after(elmB)

// <elmB>
// <elmA>
```

`.inside(parent, childIndex, withNodes)`
```js
put(newElm).inside(parent)

/* 
  <parent>
    <elmA>
    <elmB>
    <newElm> last by default
  </parent>
*/
```
```js
put(newElm).inside(parent, 0)

/* 
  <parent>
    <newElm> child index 0
    <elmA>
    <elmB>
  </parent>
*/
```
```js
put(newElm).inside(parent, -2)

/* 
  <parent>
    <elmA>   -4
    <elmB>   -3
    <newElm> -2
    <elmC>   -1
  </parent>
*/
```
```js
put(newElm).inside(parent, 1, true)

/* 
  <parent>
    hello 0
    <newElm> 1 when also counting text-nodes
    <elmA> 2
    world 3
    <elmB> 4
  </parent>
*/
```


&nbsp;

&nbsp;

&nbsp;

Development
===========

TDD
---
`npm run dev` - Run Mocha tests + watch

&nbsp;

Playground
----------
1. `npm run play`
2. Open file in the browser:
	* `<PATH_TO>/playground/playground.html` 

&nbsp;

Check Stuff
-----------
* `lint`        - Eslint check issues
* `test`        - Mocha test (for build)
* `check:types` - Eslint check issues
* `check`       - lint + types + test

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




