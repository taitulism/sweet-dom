const _children = require('./common/_children');

module.exports = function children (elm, withNodes) {
	const elms = _children(elm, withNodes);

	return Array.from(elms);
};
