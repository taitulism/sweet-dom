module.exports = function lastChild (parent, newElm, withTextNodes) {
	if (typeof newElm == 'boolean') {
		withTextNodes = newElm;
		newElm = null;
	}

	// setter
	if (newElm) {
		parent.appendChild(newElm);
		return;
	}

	return (withTextNodes) ? parent.lastChild : parent.lastElementChild;
};
