const getFirstChild = (parent, withTextNodes) => (
	(withTextNodes) ? parent.firstChild : parent.firstElementChild
);

module.exports = function firstChild (parent, newElm, withTextNodes) {
	if (typeof newElm == 'boolean') {
		withTextNodes = newElm;
		newElm = null;
	}

	// setter
	if (newElm) {
		const currentFirst = getFirstChild(parent, withTextNodes);
		parent.insertBefore(newElm, currentFirst);
		return;
	}

	return getFirstChild(parent, withTextNodes);
};
