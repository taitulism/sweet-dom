module.exports = function value (inputElm, val) {
	if (val) {
		inputElm.value = val;
	}
	else {
		return inputElm.value;
	}
};
