module.exports = function on (event, elm, callback, secondary) {
	if (event === 'hover') {
		secondary = secondary || callback;
		elm.addEventListener('mouseenter', callback, false);
		elm.addEventListener('mouseleave',  secondary, false);

		return function off () {
			elm.removeEventListener('mouseenter', callback, false);
			elm.removeEventListener('mouseleave', secondary, false);
		};
	}

	elm.addEventListener(event, callback, false);

	return function off () {
		elm.removeEventListener(event, callback, false);
	};
};
