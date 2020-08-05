module.exports = function parent (elm, level) {
	const parentElm = elm.parentNode;

	if (!level || level === 1) return parentElm;

	if (parentElm) return parent(parentElm, --level);

	return null;
};
