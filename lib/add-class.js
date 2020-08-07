module.exports = function addClass (elm, classnames) {
	if (typeof classnames == 'string') {
		classnames = [classnames];
	}

	elm.classList.add(...classnames);
};
