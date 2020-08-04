const forIn = require('./common/for-in');

module.exports = function data (elm, key, value) {
	if (typeof value == 'string') {
		elm.dataset[key] = value;
	}
	else if (typeof value === 'undefined') {
		if (typeof key == 'string') {
			return elm.dataset[key];
		}

		forIn(key, (k, v) => {
			elm.dataset[k] = v;
		});
	}
	else if (value === 0 || value === null) {
		delete elm.dataset[key];
	}

	return elm;
};
