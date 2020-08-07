module.exports = function on (elm, eventName, callback, secondary) {
	// swap first two args
	if (typeof elm == 'string' && eventName instanceof window.HTMLElement) {
		[eventName, elm] = [elm, eventName];
	}

	if (eventName === 'hover') {
		secondary = secondary || callback;
		elm.addEventListener('mouseenter', callback, false);
		elm.addEventListener('mouseleave',  secondary, false);

		return function off () {
			elm.removeEventListener('mouseenter', callback, false);
			elm.removeEventListener('mouseleave', secondary, false);
		};
	}

	elm.addEventListener(eventName, callback, false);

	return function off () {
		elm.removeEventListener(eventName, callback, false);
	};
};
