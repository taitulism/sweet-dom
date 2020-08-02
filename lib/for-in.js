module.exports = function forIn(obj, fn) {
	const keys = Object.keys(obj);
	let index = keys.length - 1;

	while (index >= 0) {
		const key = keys[index];
		fn.call(obj, key, obj[key]);
		index -= 1;
	}
};
