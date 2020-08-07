module.exports = function removeClass (elm, classnames) {
	if (typeof classnames == 'string') {
		classnames = [classnames];
	}

	elm.classList.remove(...classnames);
};
