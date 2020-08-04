const forIn = require('./common/for-in');

module.exports = function create (elmStr, attrs, styles) {
	if (!elmStr) return document.createElement('div');

	const [tagAndId, ...classnames] = elmStr.split('.');
	let [tag, id] = tagAndId.split('#');

	tag = tag || 'div';
	id = id || null;

	const elm = document.createElement(tag);

	if (id) elm.id = id;
	if (classnames.length) elm.classList.add(...classnames);

	if (attrs) {
		forIn(attrs, (key, value) => {
			elm.setAttribute(key, value);
		});
	}

	if (styles) {
		forIn(styles, (key, value) => {
			elm.style[key] = value;
		});
	}

	return elm;
};
