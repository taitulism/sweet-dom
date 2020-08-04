const _children = require('./common/_children');
const collection2array = require('./common/collection-to-array');

module.exports = function children (elm, withNodes) {
	const elms = _children(elm, withNodes);

	return collection2array(elms);
};
