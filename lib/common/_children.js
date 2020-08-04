module.exports = function _children (elm, withNodes) {
	return withNodes ? elm.childNodes : elm.children;
};
