const {slice} = Array.prototype;

module.exports = function collection2array (collection) {
	return slice.call(collection);
};
