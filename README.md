[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/taitulism/<dom-lib>.svg?branch=master)](https://travis-ci.org/taitulism/<dom-lib>)


dom-lib
=======
A thin DOM wrapper to make common vanilla operations a bit more convenient.

* [Element Selection](#element-selection)
* [Event Binding](#event-binding)
* [Element Creation](#element-creation)
* [DOM Manipulation](#dom-manipulation)


Element Selection
-----------------
* **`$`** &nbsp; - alias for `document.querySelector()`
* **`$$`** - alias for `document.querySelectorAll()`

Example:
```js
const elm = $('#my-id');
const elms = $$('.my-classname');
```

Event Binding
-------------
* **`bindEvent()`**
* **`bindEventOnce()`**

A wrapper around `addEventListener()`.
Accepts the same arguments ([`addEventListener` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener))
### Return: remove-listener function

Example:
```js
const unBindClick = bindEvent(elm, 'click', (ev) => {...});
// or:
const unBindClick = bindEventOnce(elm, 'click', (ev) => {...});

unBindClick();
```


Element Creation
----------------
* **`createElm()`**
* **`createFrag()`**
### Return: `HTMLElement` or `DocumentFragment`, respectively.

### **createElm(selector, attributes, content)**

#### **selector** - Required
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

#### **attributes**
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

#### **contents**
<!-- TODO: improve explanation -->
The element contents. Could be either a string, an element or an array of elements.

Example:
```js
const selector = 'button';
const content = 'Click';

createElm(selector, content)
// <button>Click</button>
```


### **createFrag(...contents?)**
### **`contents`** - [same as `createElm` above](#contents)

Example:
```js
createFrag(elm1, elm2, 'some string', elm3)
```


DOM Manipulation
----------------
For placing elements.

**`put(elm)`**
> All methods accept an element or an query selector string.
* **`.before(anotherElm)`**
* **`.after(anotherElm)`**
* **`.inside(containerElm, childIndex, withNodes)`**

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

`.inside(container, childIndex, withNodes)`
```js
put(newElm).inside(container)

/* 
  <container>
    <elmA>
    <elmB>
    <newElm> last by default
  </container>
*/
```
```js
put(newElm).inside(container, 0)

/* 
  <container>
    <newElm> child index 0
    <elmA>
    <elmB>
  </container>
*/
```
```js
put(newElm).inside(container, -2)

/* 
  <container>
    <elmA>   -4
    <elmB>   -3
    <newElm> -2
    <elmC>   -1
  </container>
*/
```
```js
put(newElm).inside(container, 1, true)

/* 
  <container>
    hello 0
    <newElm> 1 when also counting text-nodes
    <elmA> 2
    world 3
    <elmB> 4
  </container>
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




