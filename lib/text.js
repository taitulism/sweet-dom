module.exports = function text (elm, txt) {
	if (txt) {
		if (typeof txt == 'boolean') {
			return elm.innerText;
		}
		else {
			elm.textContent = txt;
		}
	}
	else {
		return elm.textContent;
	}
};
