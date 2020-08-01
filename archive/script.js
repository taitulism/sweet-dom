/* eslint-disable */

var dom = (function(win, doc) {
	var dom;

	var hasOwn = Object.prototype.hasOwnProperty;
	var slice  = Array.prototype.slice;

	var relativesMap = {
		P: 'parent',
		c: 'child',
		n: 'next_',
		p: 'prev_'
	};

	var collection2array = function (collection) {
		return slice.call(collection);
	};

	var $ = {
		id: function (id) {
			return doc.getElementById(id);
		},

		cls: function (cls, ctx, tag) {
			var elms;

			if (typeof ctx === 'string') {
				tag = ctx;
				ctx = doc;
			}

			ctx  = ctx || doc;
			elms = ctx.getElementsByClassName(cls);
			elms = collection2array(elms);

			if (tag) {
				return elms.filter(function (elm) {
					if (elm.nodeName === tag.toUpperCase()) {
						return true;
					}
					return false;
				});
			}

			return elms;
		},

		tag: function (tag, ctx) {
			var elms;

			ctx  = ctx || doc;
			elms = ctx.getElementsByTagName(tag);

			return collection2array(elms);
		},

		qs: function (sel, ctx) {
			ctx = ctx || doc;
			return ctx.querySelector(sel);
		},

		qsa: function (sel, ctx) {
			var elms;

			ctx  = ctx || doc;
			elms = ctx.querySelectorAll(sel);

			return collection2array(elms);
		}
	};

	var classList = {
		has: function (elm, cls) {
			return elm.classList.contains(cls);
		},
		add: function (elm, cls) {
			elm.classList.add(cls);
		},
		remove: function (elm, cls) {
			elm.classList.remove(cls);
		},
		toggle: function (elm, cls) {
			elm.classList.toggle(cls);
		}
	};

	function forIn (obj, fn) {
		var key;
		var _hasOwn = hasOwn.bind(obj);

		for (key in obj) {
			if (_hasOwn(key)) {
				fn.call(obj, key, obj[key]);
			}
		}
	}

	function isObject (x) {
		return Object.prototype.toString.call(x).substr(8,3) === 'Obj'; // [object Object]
	}

	function ready (fn) {
		var readyState = doc.readyState;

		if (readyState !== 'complete' && readyState !== 'interactive') {
			doc.addEventListener('DOMContentLoaded', function() {
				fn();
			});
		}
		else {
			fn();
		}
	}

	function on (event, elm, cbfn, cbfn2) {
		if (event === 'hover') {
			cbfn2 = cbfn2 || cbfn;
			elm.addEventListener('mouseenter', cbfn, false);
			elm.addEventListener('mouseleave',  cbfn2, false);

			return function off () {
				elm.removeEventListener('mouseenter', cbfn, false);
				elm.removeEventListener('mouseleave', cbfn2, false);
			};
		}
		else {
			elm.addEventListener(event, cbfn, false);

			return function off () {
				elm.removeEventListener(event, cbfn, false);
			};
		}
	}

	function create (elmStr) {
		var elm, id, cls;

		elmStr = elmStr || '';

		elm = elmStr.match(/^\w+/);
		id  = elmStr.match(/#(\w+)/);
		cls = elmStr.match(/(\.\w+)+/);

		elm = doc.createElement(elm || 'div');

		id  = (id)  ?  id[1] : null;
		cls = (cls) ? cls[0] : null;

		if (id) {
			elm.id = id;
		}

		if (cls) {
			elm.className = cls.substr(1).replace(/\./g, ' ');
		}

		return elm;
	}

	function remove (elm) {
		elm.parentNode.removeChild(elm);
	}

	function attr (elm, atrName, value) {
		if (typeof value === 'undefined') {
			if (isObject(atrName)){
				forIn(atrName, function (key, val) {
					elm.setAttribute(key, val);
				});
			}
			else {
				return elm.getAttribute(atrName);
			}
		}
		else {
			if (value === 0 || value === null){
				elm.removeAttribute(atrName);
			}
			else {
				elm.setAttribute(atrName, value);
			}
		}
	}

	function data (elm, name, value) {
		if (typeof value === 'undefined') {
			if (isObject(name)){
				forIn(name, function (key, val) {
					elm.dataset[key] = val;
				});
			}
			else {
				return elm.dataset[name];
			}
		}
		else {
			if (value === 0 || value === null){
				delete elm.dataset[name];
			}
			else {
				elm.dataset[name] = value;
			}
		}
	}

	function text (elm, txt) {
		if (!txt) {
			return elm.textContent;
		}
		else {
			elm.textContent = txt;
		}
	}

	function html (elm, html) {
		if (!html) {
			return elm.innerHTML;
		}
		else {
			elm.innerHTML = html;
		}
	}

	function value (inputElm, val) {
		if (!val) {
			return inputElm.value;
		}
		else {
			inputElm.value = val;
		}
	}

	function css (elm, css_key, value) {
		var style;

		if (!value) {
			style = elm.style;

			if (typeof css_key === 'object') {
				// set object
				forIn(css_key, function (prop, val) {
					style[prop] = val;
				});
			}
			else {
				// get
				return win.getComputedStyle(elm)[prop];
			}
		}
		else {
			// set one prop
			style[css_key] = value;
		}
	}

	function show (elm) {
		elm.style.display = 'block';
	}

	function hide (elm) {
		elm.style.display = 'none';
	}

	function getBox (elm) {
		return elm.getBoundingClientRect();
	}

	function next_ (elm, num, countText, alwaysElm) {
		var tempElm = next(elm, countText, alwaysElm);

		if (!num || num === 1) return tempElm;

		if (tempElm) return next_(tempElm, --num, countText, alwaysElm);

		else return (alwaysElm) ? tempElm : null;
	}

	function next (elm, countText, alwaysElm) {
		var tempElm = (countText) ? elm.nextSibling : elm.nextElementSibling;

		if (alwaysElm) {
			return tempElm || elm;
		}

		return tempElm || null;
	}

	function prev_ (elm, num, countText, alwaysElm) {
		var tempElm = prev(elm, countText, alwaysElm);

		if (!num || num === 1) return tempElm;

		if (tempElm) return prev_(tempElm, --num, countText, alwaysElm);

		else return (alwaysElm) ? tempElm : null;
	}

	function prev (elm, countText, alwaysElm) {
		var tempElm = (countText) ? elm.previousSibling : elm.previousElementSibling;

		if (alwaysElm) {
			return tempElm || elm;
		}

		return tempElm || null;
	}

	function parent (elm, num) {
		elm = elm.parentNode;

		if (!num || num === 1) return elm;

		if (elm) return parent(elm, --num);

		return null;
	}

	function child (parent, num, countText, alwaysElm) {
		var children = _children(parent, countText);
		var len      = (countText) ? children.length : parent.childElementCount;

		/* Deal Breaker */ if (!len) {return;} // no children (undefined)

		if (alwaysElm) {
			if (num > len-1) {
				return children[len-1];
			}

			if (num < 0 && len-num < 0) {
				return children[0];
			}
		}

		if (num < 0) {
			num = len + num;
		}

		return children[num] || null;
	}

	function firstChild (parent, countText) {
		return (countText) ? parent.firstChild : parent.firstElementChild;
	}

	function lastChild (parent, countText) {
		return (countText) ? parent.lastChild : parent.lastElementChild;
	}

	function _children (elm, countText) {
		return (countText) ? elm.childNodes : elm.children;
	}

	function children (elm, countText) {
		var children = _children(elm, countText);

		return collection2array(children);
	}

	function siblings (elm, countText) {
		var children = (countText) ? elm.parentNode.childNodes : elm.parentNode.children;

		return collection2array(children).filter(function (child) {
			return child !== elm;
		});
	}

	function index (elm, countText) {
		var children = _children(elm.parentNode, countText);
		var i = children.length;

		while (i > -1) {
			if (children[i] === elm) return i;

			i--;
		}
	}

	function findRelative (elm, str) {
		str.split(/\W+/).forEach(function(rel) {
			var method = relativesMap[rel[0]];
			var num    = (rel.length > 1) ? rel.substr(1) : 0;

			num = parseInt(num, 10);

			elm = dom[method](elm, num);
		});

		return elm;
	}

	function putCreator (elm) {
		return new PutConstructor(elm);
	}

	function PutConstructor (elm) {
		this.elm = elm;
	}

	PutConstructor.prototype = {
		constructor: PutConstructor,

		before: function (refElm) {
			refElm.parentNode.insertBefore(this.elm, refElm);
		},

		after: function (refElm) {
			refElm.parentNode.insertBefore(this.elm, refElm.nextElementSibling);
		},

		inside: function (parent, index, countText) {
			var refElm;
			var len = _children(parent, countText).length;

			if (index === -1 || index >= len) {
				parent.appendChild(this.elm);
				return;
			}

			if (index < -1) {
				index = len + index + 1;
			}

			refElm = child(parent, index, countText);

			parent.insertBefore(this.elm, refElm);
		},

		instead: function (refElm) {
			refElm.parentNode.replaceChild(this.elm, refElm);
		},

		away: function () {
			this.elm.parentNode.removeChild(this.elm);
		}
	};

	dom = {
		on: on,
		ready: ready,

		$   : $,
		$id : $.id,
		$qs : $.qs,
		$cls: $.cls,
		$qsa: $.qsa,
		$tag: $.tag,

		create: create,
		put   : putCreator,
		remove: remove,

		hasClass   :    classList.has,
		addClass   :    classList.add,
		removeClass: classList.remove,
		toggleClass: classList.toggle,

		attr :attr,
		data :data,
		text :text,
		value:value,
		html :html,

		css   : css,
		show  : show,
		hide  : hide,
		getBox: getBox,

		index       : index,
		next_       : next_,
		next        : next,
		prev_       : prev_,
		prev        : prev,
		parent      : parent,
		firstChild  : firstChild,
		lastChild   : lastChild,
		child       : child,
		children    : children,
		siblings    : siblings,
		findRelative: findRelative,
	};

	return dom;
}(window, document));
