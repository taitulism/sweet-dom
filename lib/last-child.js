module.exports = function lastChild (parentElm, withNodes) {
	return (withNodes) ? parentElm.lastChild : parentElm.lastElementChild;
};
