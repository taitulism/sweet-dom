![Build Status](https://github.com/taitulism/sweet-dom/actions/workflows/node-ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


sweet-dom
=========
A DOM library for developers who don't want a DOM library.

> **Less than 2 KB** of minified runtime code. Peanuts.

Modern JavaScript has improved so much, old IE is out of the picture and the need for a comprehensive DOM library is decreasing.  
If you are comfortable with writing vanilla DOM but wouldn't mind just a tiny bit of sugar on top - this is for you.

A good pick for small vanilla projects or for working with existing DOM (e.g browser extension).  
Could also be handy as a secondary pocket tool alongside your main components library, for those cases you do need some vanilla DOM (e.g. handling Ref elements and protals with React).

&nbsp;

## What's in the box?

* [Element Selection](#element-selection)
	* `$()`
	* `$$()`
	* `$id()`
	* `$class()`
	* `$tag()`
* [Element Creation](#element-creation)
	* [`createElm()`](#createelmselector-content)
	* [`createFrag()`](#createfragcontents)
* [Element Utils](#element-utils)
	* [`setStyle()`](#setstyleelm-styleobject)
	* [`setAttributes()`](#setattributeselm-attrobject)
* [Element Insertion](#element-insertion)
	* `insert().before()`
	* `insert().after()`
* [Event Binding](#event-binding)
	* `bindEvent()`
	* `bindEventOnce()`

&nbsp;

----------------------------------------
## **Installation**
```sh
$ npm install --save sweet-dom
```

or [grab the iife](https://cdn.jsdelivr.net/gh/taitulism/sweet-dom/dist/browser/sweet-dom.min.js) and drop it like it's hot.


## **Usage**
```js
import {createElm, bindEvent} from 'sweet-dom';
```

&nbsp;


## **API**

--------------------
## Element Selection

* **`$`** &nbsp; - an alias for `document.querySelector()`
* **`$$`** - an alias for `document.querySelectorAll()`
* **`$id`** - A shortcut for `document.getElementById()`
* **`$class`** - A shortcut for `document.getElementsByClassName()`
* **`$tag`** - A shortcut for `document.getElementsByTagName()`


> The methods that return multiple elements, `$$`, `$class`, `$tag` - returns an array of elements instead of live-collections or node-lists.

> All methods except `$id` also accepts a second argument: the context element to query (the default is `document`).


```js
const elm = $('#my-id');
const elms = $$('.my-classname');
const elm = $id('my-id');
const elms = $class('my-classname');
const elms = $tag('div');

// within context
const elms = $tag('div', containerElm);
```

&nbsp;

-------------------
## Element Creation

* [`createElm()`](#createelmselector-content)
* [`createFrag()`](#createfragcontents)

### **`createElm(selector, content1, content2, ...contentN)`**
Returns `HTMLElement`
#### **`selector`** - Required
A string descriptor of an element. Supports a tag-name, an ID and classnames of the following format:
```js
'tag#id.classname1.classname2'

// Results: <tag id="id" classname="classname1 classname2" />
```
```js
const selector = 'input#first-name.form-field.required-field';

createElm(selector)

// <input id="first-name" classname="form-field required-field" />
```


#### **`...contents`** - Optional
The created element's children, spread as arguments. Accepts HTML elements, nodes and strings.

```js
// single
const contents = 'Click'

createElm('button', contents)

// <button>Click</button>

```
```js
// multiple
createElm('button', iconElm, 'Click')

// spread arrays
const contents = [iconElm, 'Click']
createElm('button', ...contents)

//<button> ☻ Click</button>
```

&nbsp;

### **`createFrag(...contents?)`**
Returns `DocumentFragment`

#### **`...contents`**
Accepts HTML elements, nodes and strings.

Example:
```js
createFrag(elm1, elm2, 'some string', elm3)
```

&nbsp;

----------------
## Element Utils

* [`setStyle()`](#setstyleelm-styleobject)
* [`setAttributes()`](#setattributeselm-attrobject)

### **`setStyle(elm, styleObject)`**
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

&nbsp;

--------------------
## Element Insertion

For placing elements.

**`insert(elm)`**

* **`.before(anotherElm)`**
* **`.after(anotherElm)`**

> Both methods accept an element or a query selector string.
> To insert multiple elements pass in a fragment with children (see [createFrag](#createfragcontents)) not an array of elements.

### **`.before(anotherElm)`**
```js
insert(elmA).before(elmB)

// <elmA>
// <elmB>
```

### **`.after(anotherElm)`**
```js
insert(elm).after('#logo')

// <div id="logo">
// <elm>
```

&nbsp;

----------------
## Event Binding

* **`bindEvent()`**
* **`bindEventOnce()`**

A wrapper around `addEventListener()`.
Accepts the event-target as first argument and the rest are the same arguments as the vanilla [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Returns a remove-listener function

```js
const unBindClick = bindEvent(elm, 'click', (ev) => {...})
// or:
const unBindClick = bindEventOnce(elm, 'click', (ev) => {...})

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
This is the bigger part in the library with the most value. A high-level function to not just create but also design an HTML element. Covers the element tagname, id, classnames and the element's children. 


Justification: createFrag
-------------------------
To be honest, I don't use fragments that often. So why did I add it? Mostly to be able to work with the `insert()` interface with multiple elements without adding the code that handles array|single elements.

It's a kind of a compromise but the fact that it only adds 3 short lines of code (before minifying) is the comfort.


Justification: Element Utils
----------------------------
Why? because it never ends with just creating an element. We always adding some contents and usually give it a classname or some styling.


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
`npm run dev` - Vitest + watch

&nbsp;

Browser Playground
------------------
1. `npm run play`
2. Open file in the browser:
	* `./playground/playground.html` 

&nbsp;

Check Stuff
-----------
* `npm run lint`   - Eslint check issues
* `npm run types`  - TypeScript type checking
* `npm run test`   - Vitest (for build)
* `npm run checks` - lint + types + test (all)

&nbsp;

Publish a new version
---------------------
1.
	> **`version` script Note:**  
	> If something from `dist` folder is git tracked - add `" && git add dist"` to end of the script 
	
	&nbsp;

	```sh
	$ npm version major|minor|patch
	```  
	triggers:

	* `preversion`  - Runs the `checks` script
	* `version`     - Runs the `build` script
		* `prebuild`  - Delete `"dist"` folder
		* `build`     - Rollup build for production
		* `postbuild` - Delete temporary declaration folder inside `"dist"`
	* `postversion` - Git push + tags

	&nbsp;
	
2.
	```sh
	$ npm publish
	``` 
	triggers:

	* `prepublishOnly` - Runs the `checks` script
