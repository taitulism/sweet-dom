module.exports = function prev (elm, num, withNodes) {
	if (typeof num == 'boolean') {
		withNodes = num;
		num = 1;
	}

	const prevElm = (withNodes) ? elm.previousSibling : elm.previousElementSibling;

	if (prevElm && num > 1) {
		return prev(prevElm, --num, withNodes);
	}

	return prevElm || null;
};
