const _children = require('./common/_children');

module.exports = function getChild (parentElm, index, withNodes) {
	const children = _children(parentElm, withNodes);
	const len = children.length;

	if (!len) return null;

	if (index < 0) {
		index = len + index;
	}

	return children[index] || null;
};
