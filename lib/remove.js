module.exports = function remove (...elms) {
	elms.forEach((elm) => {
		elm.parentNode.removeChild(elm);
	});
};
