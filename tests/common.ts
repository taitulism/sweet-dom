/*
	Generally this is not needed but using the global scope to hold the
	JSDOM document causes a weird bug:
	When a test fails, sometimes instead of showing the failed code, we get an error:
	"SecurityError: localStorage is not available for opaque origins".
	This happens even if the library has nothing to do with `localStorage`.

	Adding this object as the JSDOM second argument fixes it.
*/
export const jsdomOpts = {url: 'http://localhost/'};
