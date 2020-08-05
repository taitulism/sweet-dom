module.exports = function next (elm, num, withNodes) {
	if (typeof num == 'boolean') {
		withNodes = num;
		num = 1;
	}

	const nextElm = (withNodes) ? elm.nextSibling : elm.nextElementSibling;

	if (nextElm && num > 1) {
		return next(nextElm, --num, withNodes);
	}

	return nextElm || null;
};
