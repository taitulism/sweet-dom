const getElm = (elmOrSelector: HTMLElement | string): HTMLElement | null => (
	typeof elmOrSelector === 'string'
		? document.querySelector(elmOrSelector)
		: elmOrSelector
);

export const insert = (elm: HTMLElement | DocumentFragment) => ({
	before: (otherElmOrSelector: HTMLElement | string) => {
		const otherElm = getElm(otherElmOrSelector);

		otherElm?.parentElement?.insertBefore(elm, otherElm);
	},
	after: (otherElmOrSelector: HTMLElement | string) => {
		const otherElm = getElm(otherElmOrSelector);

		otherElm?.parentElement?.insertBefore(elm, otherElm.nextSibling);
	},
});
