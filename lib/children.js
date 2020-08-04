const collection2array = require('./common/collection-to-array');

module.exports = function children (elm, withNodes) {
	const elms = withNodes ? elm.childNodes : elm.children;

	return collection2array(elms);
};
