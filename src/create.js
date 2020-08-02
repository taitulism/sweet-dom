module.exports = function create (elmStr) {
	if (!elmStr) return document.createElement('div');

	const [tagAndId, ...classnames] = elmStr.split('.');
	let [tag, id] = tagAndId.split('#');

	tag = tag || 'div';
	id = id || null;

	const elm = document.createElement(tag);

	if (id) elm.id = id;
	if (classnames.length) elm.classList.add(...classnames);

	return elm;
};
