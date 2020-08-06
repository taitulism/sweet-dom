const _children = require('./common/_children');

module.exports = function createPut (elm) {
	return new Put(elm);
};


class Put {
	constructor (elm) {
		this.elm = elm;
	}

	before (otherElm) {
		otherElm.parentNode.insertBefore(this.elm, otherElm);
	}

	after (otherElm, withTextNodes) {
		const beforeNextElm = withTextNodes ? otherElm.nextSibling : otherElm.nextElementSibling;
		otherElm.parentNode.insertBefore(this.elm, beforeNextElm);
	}

	instead (otherElm) {
		otherElm.parentNode.replaceChild(this.elm, otherElm);
	}

	away () {
		this.elm.parentNode.removeChild(this.elm);
	}

	inside (parent, index, withTextNodes) {
		const siblings = _children(parent, withTextNodes);

		// last by default
		if (typeof index != 'number') {
			parent.appendChild(this.elm);
			return;
		}

		const otherElm = siblings[index];

		parent.insertBefore(this.elm, otherElm);
	}
}
