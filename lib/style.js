const forIn = require('./common/for-in');

module.exports = function style (elm, key, value) {
	if (value) {
		elm.style[key] = value;
	}
	else {
		if (typeof key === 'string') {
			return window.getComputedStyle(elm)[key];
		}

		const {style: elmStyle} = elm;

		forIn(key, (k, v) => {
			elmStyle[k] = v;
		});
	}

	return elm;
};
