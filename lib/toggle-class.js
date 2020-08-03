module.exports = function toggleClass (elm, cls, state = null) {
	if (state == null) {
		elm.classList.toggle(cls);
	}
	else if (state) {
		elm.classList.add(cls);
	}
	else {
		elm.classList.remove(cls);
	}
};
