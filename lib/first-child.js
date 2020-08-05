module.exports = function firstChild (parentElm, withNodes) {
	return (withNodes) ? parentElm.firstChild : parentElm.firstElementChild;
};
