const _children = require('./common/_children');

module.exports = function getChild (parentElm, index, withNodes) {
	const children = _children(parentElm, withNodes);
	const len = (withNodes) ? children.length : parentElm.childElementCount;

	if (!len) return null;

	return children[index] || null;
};
