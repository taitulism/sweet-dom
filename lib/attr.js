const forIn = require('./for-in');

module.exports = function attr (elm, key, value) {
	if (typeof value == 'string') {
		elm.setAttribute(key, value);
	}
	else if (typeof value === 'undefined') {
		if (typeof key == 'string') {
			return elm.getAttribute(key);
		}

		forIn(key, (k, v) => {
			elm.setAttribute(k, v);
		});
	}
	else if (value === 0 || value === null) {
		elm.removeAttribute(key);
	}

	return elm;
};
