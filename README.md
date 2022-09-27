[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/taitulism/<dom-lib>.svg?branch=master)](https://travis-ci.org/taitulism/<dom-lib>)


dom-lib
=======
A thin DOM wrapper to make common vanilla operations a bit more convenient.

Why?
----
No, really why? There are so many DOM libraries, modern vanilla js has improved so much, IE is out of the picture and who uses vanilla js for handling DOM these days anyway?


Yet, I still find myself using vanilla js DOM operations here and there, every once in a while. For a chrome extension, a TamperMonkey script or a bookmarklet. Heck, even when I'm working on a React app I sometimes need some vanilla, for example when using Ref elemets or selecting by id.

Since there are a lot of comprehensive libraries out there (e.g. `jQuery`) I thought about going with another approach: taking care of the most common stuff that vanilla doesn't cover conveniently enough (IMHO), keeping it simple and slim (less then 2KB). This way I would be able to just drop it in any project without thinking about the overhead I'm adding to the project with no considerations about bundle size and loading times. That is the real value of this library, for me.

The biggest challange was to decide what gets into this library and what stays out, even if it hurt. Pick the ideal API without over-complicating, providing maximum value with minimum code, and only that.

<!-- TODO: justifications for the different parts

<details>
	<summary>Read more about the different justifications</summary>

Let's take `document.querySelectorAll` for example. It's one of the things that every time I'm writing I'm always bitching about:  
> "Why do I have to type all of these (25!) characters every time while browsers dev-tools let me just use `$` and `$$` signs?"

Obviously, one of the first things I have added it's `$` and `$$`, two aliases for `querySelector` and `querySelectorAll`, respectively. So with two short lines of code I saved me a lot of bitching around. Great value for me.

My next targets were `document.getElementById` and its friends. I wanted something like `$id()`or `$tag()`. Now of course `querySelector` already supports querying by id, classname and tagname but I also know that it's much slower than `getElementsBy__` so I looked at the numbers:
Yes, `getElementsBy__` methods are faster **but** for 99.99% percent of the time it's insignificant even on the worst-of-the-worst-case reallife scenario.
When you select a couple of elements the difference is like less than a millisecond. Things only get serious when you're selecting thousands of elements.

</details>
-->

&nbsp;
-------------------------------------------------------

## Preps

### Install:
```sh
$ npm install --save dom-lib
```

### Use:
```js
// esm:
import * as domlib from 'dom-lib';

// commonJS:
const domLib = require('dom-lib');
```

<details>
	<!-- TODO: keep up-to-date -->
	<summary>or just grab the iife from here and drop it like it's hot.</summary>
&nbsp;

Last update: **Sep 27, 2022**

```js
var domLib=function(e){"use strict";const t=(e,t)=>{for(const n in e)Object.hasOwnProperty.call(e,n)&&t(n,e[n])},n=(e,n)=>{t(n,((t,n)=>{e.setAttribute(t,n)}))},r=(e,n)=>{t(n,((t,n)=>{e.style[t]=n}))},s=(e,n)=>{t(n,((t,n)=>{e.dataset[t]=n}))},o=(e,t)=>{Array.isArray(t)?e.append(...t):e.append(t)},a=e=>"string"==typeof e||e instanceof window.HTMLElement||Array.isArray(e),c=e=>{const[t,...n]=e.split("."),[r,s]=t.split("#");return{tag:r||"div",id:s||void 0,classnames:n||void 0}},i=(e,t)=>{t.style&&(r(e,t.style),delete t.style),t.data&&(s(e,t.data),delete t.data),n(e,t)},l={once:!0},d=(e,t,n,r)=>(e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)),u=e=>"string"==typeof e?document.querySelector(e):e;class m{constructor(e){this.elm=e}before(e){const t=u(e);t?.parentNode?.insertBefore(this.elm,t)}after(e){const t=u(e);t?.parentNode?.insertBefore(this.elm,t.nextSibling)}inside(e,t=-1,n=!1){const r=u(e);if(!r)return;const s=n?r.childNodes:r.children,o=s[t=t>=0?t:s.length+1+t]||null;r.insertBefore(this.elm,o)}}return e.$=(e,t=document)=>t.querySelector(e),e.$$=(e,t=document)=>t.querySelectorAll(e),e.bindEvent=d,e.bindEventOnce=(e,t,n,r)=>{const s="boolean"==typeof r?{...l,capture:r}:r?{...r,...l}:l;return d(e,t,n,s)},e.createElm=(e,t,n)=>{const{tag:r,id:s,classnames:l}=c(e),d=document.createElement(r);return s&&(d.id=s),l?.length&&d.classList.add(...l),t&&(a(t)?o(d,t):i(d,t)),n&&o(d,n),d},e.createFrag=(...e)=>{const t=document.createDocumentFragment();return e.length&&t.append(...e),t},e.put=e=>new m(e),e.setAttributes=n,e.setContent=o,e.setData=s,e.setStyle=r,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
```
</details>

&nbsp;

## What's in the box?
* [Element Selection](#element-selection)
* [Event Binding](#event-binding)
* [Element Creation](#element-creation)
* [Element Utils](#element-utils)
	* [`setStyle()`](#setstyleelm-styleobject)
	* [`setAttributes()`](#setattributeselm-attrobject)
	* [`setData()`](#setdataelm-dataobject)
	* [`setContent()`](#setcontentelm-contents)
* [DOM Manipulation](#dom-manipulation)

-------------------------------------------------------

Element Selection
-----------------
* **`$`** &nbsp; - alias for `document.querySelector()`
* **`$$`** - alias for `document.querySelectorAll()`

```js
const elm = $('#my-id');
const elms = $$('.my-classname');
```

Event Binding
-------------
<!-- TODO: Justification:
	Binding events is not an exlusive DOM operation but it's too common, especially when creating interactive elements. The main value is the return unbind function. The "once" version is just too common and too small to leave out.
-->
* **`bindEvent()`**
* **`bindEventOnce()`**

A wrapper around `addEventListener()`.
Accepts the same arguments ([`addEventListener` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener))
### Return: remove-listener function

```js
const unBindClick = bindEvent(elm, 'click', (ev) => {...});
// or:
const unBindClick = bindEventOnce(elm, 'click', (ev) => {...});

unBindClick();
```


Element Creation
----------------
<!-- TODO: Justification:
This is the bigger part in the library with the most value. A high-level function to not just create but also design an HTML element. Covers the element tagname, id, classnames, regular and data attributes, inline style and the element's children. Why? because it never ends with just creating an element. We always adding some contents and usually give it a classname or some styling.  
-->
* **`createElm()`** - Return `HTMLElement`
* **`createFrag()`** - Return `DocumentFragment`

### **createElm(selector, attributes, content)**

#### **`selector`** - Required
A string descriptor of an element. Supports a tag-name, an ID and classnames of the following format:
```js
'tag#id.classname1.classname2'
```
```js
const selector = 'input#first-name.form-field.required-field';

createElm(selector)

// <input id="first-name" classname="form-field required-field" />
```

#### **`attributes`**
An object whose properties will be set as the element attributes.
Two special keys are `style` and `data` which expected to be objects. The `style` object is to set inline style properties and the `data` is for data-attributes.

```js
const attributes = {
  type: 'text',
  style: {
    margin: '5px',
  },
  data: {
    something: 'yes'
  }
}

createElm('input', attributes)

// <input type="text" style="margin: 5px;" data-something="yes" />
```

#### **`contents`**
The created element's child elements, nodes or text contents. Could be either a single child or an array of children.

```js
// single
const contents = 'Click'

createElm('button', contents)

// <button>Click</button>

```
```js
// array
const contents = [iconElm, 'Click']

createElm('button', contents)

//<button> ☻ Click</button>
```


### **createFrag(...contents?)**
<!-- TODO: Justification:
To be honest, I don't use fragments that often. So why did I add it? Mostly to be able to work with the `put()` interface with multiple elements without adding the code that handles array|single elements.

It's a kind of a compromise but the fact that it only adds 3 short lines of code (before minifying) is the comfort.
-->
### `contents` - [same as `createElm` above](#contents)

Example:
```js
createFrag(elm1, elm2, 'some string', elm3)
```


Element Utils
-------------
<!-- TODO: Justification:
The element utils are not just methods "important enough" to get in to this library.
They are used internally (by `createElm`) and I've decided to export them to maximize the library's value.
-->
* [`setStyle()`](#setstyleelm-styleobject)
* [`setAttributes()`](#setattributeselm-attrobject)
* [`setData()`](#setdataelm-dataobject)
* [`setContent()`](#setcontentelm-contents)

### `setStyle(elm, styleObject)`
Sets an element inline style.

```js
setStyle(divElm, {
	height: '75px',
	width: '200px',
});

/* 
  <div style="height: 75px; width: 200px;" />
*/
```



### `setAttributes(elm, attrObject)`
Sets multiple attributes on an element.

```js
setAttributes(inputElm, {
	type: 'number',
	name: 'age',
});

/* 
  <input type="number" name="age" />
*/
```



### `setData(elm, dataObject)`
Sets multiple data-attributes on an element.

```js
setData(divElm, {
	hello: 'world',
	something: 'else',
});

/* 
  <div data-hello="world" data-something="else" />
*/
```



### `setContent(elm, contents)`
Appends child/children to an element. Accepts elements, nodes, strings.

```js
// single
setContent(parentElm, childElm);
/* 
  <parentElm>
    <childElm>
  </parentElm>
*/
```
```js
// array
setContent(parentElm, [child1, 'child 2', child3]);
/* 
  <parentElm>
    <child1>
    child 2
    <child3>
  </parentElm>
*/
```



DOM Manipulation
----------------
<!-- TODO: Justification:
Because I never remember the arguments order with: `parent.insertBefore(elm1, elm2)`. This API is clearer than vanilla js with a relatively small footprint.
Because there is no `insertAfter`.
Because it helps when you want to insert between text nodes or anonymouse-non-queryable elements. 
-->
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




