module.exports = function html (elm, htmlContent) {
	if (htmlContent) {
		elm.innerHTML = htmlContent;
	}
	else {
		return elm.innerHTML;
	}
};
