[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/taitulism/<sweet-dom>.svg?branch=master)](https://travis-ci.org/taitulism/<sweet-dom>)


sweet-dom
=========
A minimalistic DOM library.

### What's in the box?
* [Element Selection](#element-selection)
	* `$()`
	* `$$()`
* [Element Creation](#element-creation)
	* [`createElm()`](#createelmselector-attributes-content)
	* [`createFrag()`](#createfragcontents)
* [Element Utils](#element-utils)
	* [`setStyle()`](#setstyleelm-styleobject)
	* [`setAttributes()`](#setattributeselm-attrobject)
	* [`setData()`](#setdataelm-dataobject)
	* [`setContent()`](#setcontentelm-contents)
* [Element Insertion](#element-insertion)
	* `insert().before()`
	* `insert().after()`
* [Event Binding](#event-binding)
	* `bindEvent()`
	* `bindEventOnce()`

&nbsp;

~1.45 KB minified, not gZipped. Peanuts.

----------------------------------------
## Install
```sh
$ npm install --save sweet-dom
```

### Use:
```js
import {bindEvent, createElm} from 'sweet-dom';
```

### **or just grab the iife and drop it like it's hot.**

<details>
	<!-- TODO: keep up-to-date -->
	<summary>See minified code:</summary>
&nbsp;

Last update: **Sep 30, 2022**

```js
var sweetDom=function(e){"use strict";const t=(e,t)=>{for(const n in e)Object.hasOwnProperty.call(e,n)&&t(n,e[n])},n=(e,n)=>{t(n,((t,n)=>{e.setAttribute(t,n)}))},r=(e,n)=>{t(n,((t,n)=>{e.style[t]=n}))},s=(e,n)=>{t(n,((t,n)=>{e.dataset[t]=n}))},a=(e,t)=>{Array.isArray(t)?e.append(...t):e.append(t)},o={once:!0},c=(e,t,n,r)=>(e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)),i=e=>"string"==typeof e?document.querySelector(e):e;return e.$=(e,t=document)=>t.querySelector(e),e.$$=(e,t=document)=>t.querySelectorAll(e),e.bindEvent=c,e.bindEventOnce=(e,t,n,r)=>{const s="boolean"==typeof r?{...o,capture:r}:r?{...r,...o}:o;return c(e,t,n,s)},e.createElm=(e,t,o)=>{const{tag:c,id:i,classnames:l}=(e=>{const[t,...n]=e.split("."),[r,s]=t.split("#");return{tag:r||"div",id:s||void 0,classnames:n||void 0}})(e),d=document.createElement(c);var u;return i&&(d.id=i),l?.length&&d.classList.add(...l),t&&("string"==typeof(u=t)||u instanceof window.HTMLElement||Array.isArray(u)?a(d,t):((e,t)=>{t.style&&(r(e,t.style),delete t.style),t.data&&(s(e,t.data),delete t.data),n(e,t)})(d,t)),o&&a(d,o),d},e.createFrag=(...e)=>{const t=document.createDocumentFragment();return e.length&&t.append(...e),t},e.insert=e=>({before:t=>{const n=i(t);n?.parentElement?.insertBefore(e,n)},after:t=>{const n=i(t);n?.parentElement?.insertBefore(e,n.nextSibling)}}),e.setAttributes=n,e.setContent=a,e.setData=s,e.setStyle=r,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
```
</details>

&nbsp;

-------------------------------------------------------

Element Selection
-----------------
* **`$`** &nbsp; - an alias for `document.querySelector()`
* **`$$`** - an alias for `document.querySelectorAll()`

```js
const elm = $('#my-id');
const elms = $$('.my-classname');
```



Element Creation
----------------
* [`createElm()`](#createelmselector-attributes-content)
* [`createFrag()`](#createfragcontents)

### **createElm(selector, attributes, content)**
Returns `HTMLElement`
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
Returns `DocumentFragment`

#### **`...contents`**
Accepts strings, nodes and HTML elements.

Example:
```js
createFrag(elm1, elm2, 'some string', elm3)
```


Element Utils
-------------
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



Element Insertion
------------------
For placing elements.

**`insert(elm)`**
> Both methods accept an element or a query selector string.
> To insert multiple elements pass in a fragment with children (see [createFrag](#createfragcontents)) not an array of elements.

* **`.before(anotherElm)`**
* **`.after(anotherElm)`**

`.before(anotherElm)`
```js
insert(elmA).before(elmB)

// <elmA>
// <elmB>
```

`.after(anotherElm)`
```js
insert(elm).after('#logo')

// <div id="logo">
// <elm>
```



Event Binding
-------------
* **`bindEvent()`**
* **`bindEventOnce()`**

A wrapper around `addEventListener()`.
Accepts the event-target as first argument and the rest are the same arguments as the vanilla [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Returns a remove-listener function

```js
const unBindClick = bindEvent(elm, 'click', (ev) => {...});

unBindClick();
```



<!-- 

&nbsp;

Why?
----
No, really why? There are so many DOM libraries out there, modern vanilla js has improved so much, IE is out of the picture and who uses vanilla js for handling DOM these days anyway?

<details>
<summary>read more...</summary>

Yet, I still find myself using vanilla js DOM operations every once in a while. For a Chrome extension, a TamperMonkey script or a bookmarklet. Even when working on a React app, for `Ref` elemets or selecting by id, for example. The thing is that adding a comprehensive library like good-old-`jQuery` for some basic usage is just too much overhead and that's what I wanted to address.

I wanted a tiny DOM library with no overhead (or as little as possible). A library that I will use most of its functionality most of the time and will only cover the most common stuff that vanilla doesn't cover conveniently enough (IMHO).

The real challange was to decide what gets into this library and what stays out, even if it hurt. Pick the ideal API without over-complicating, providing the highest size-to-value ratio as possible. Like a store that only sell the few most common but also most profitable products.

This way I would be able to just drop it in any project without thinking too much about the overhead I'm adding to the project or considering bundle size and loading times. That is the real value of this library, for me.
</details>

-->
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

Justification: Element Creation
-------------------------------
This is the bigger part in the library with the most value. A high-level function to not just create but also design an HTML element. Covers the element tagname, id, classnames, regular and data attributes, inline style and the element's children. Why? because it never ends with just creating an element. We always adding some contents and usually give it a classname or some styling.  


Justification: createFrag
-------------------------
To be honest, I don't use fragments that often. So why did I add it? Mostly to be able to work with the `insert()` interface with multiple elements without adding the code that handles array|single elements.

It's a kind of a compromise but the fact that it only adds 3 short lines of code (before minifying) is the comfort.


Justification: Element Utils
----------------------------
The element utils are not just methods "important enough" to get in to this library.
They are used internally (by `createElm`) and I've decided to export them to maximize the library's value.


Justification: Event Binding
----------------------------
	Binding events is not an exlusive DOM operation but it's too common, especially when creating interactive elements. The main value is the return unbind function. The "once" version is just too common and too small to leave out.


Justification: Element Insertion
--------------------------------
Because I never remember the arguments order with: `parent.insertBefore(elm1, elm2)`. This API is clearer than vanilla js with a relatively small footprint.
Because there is no `insertAfter`.
Because vanilla still requires the parent. In the past, to remove an elm we needed `node.parent.remove(node)` then came `elm.remove()`. `insertBefore` still needs the parent.
-->








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
2. Open the playground HTML file in the browser:
	* `<PATH_TO>/playground/playground.html` 

&nbsp;

Check Stuff
-----------
* `lint`        - Eslint check issues
* `test`        - Mocha test (for build)
* `check:types` - TypeScript type checking
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




