const getElm = (elmOrSelector: HTMLElement | string): HTMLElement | null => (
	typeof elmOrSelector === 'string'
		? document.querySelector(elmOrSelector)
		: elmOrSelector
);

export const put = (elm: HTMLElement | DocumentFragment) => new Put(elm);

class Put {
	private elm: HTMLElement | DocumentFragment;

	constructor (elm: HTMLElement | DocumentFragment) {
		this.elm = elm;
	}

	before (otherElmOrSelector: HTMLElement | string) {
		const otherElm = getElm(otherElmOrSelector);

		otherElm?.parentNode?.insertBefore(this.elm, otherElm);
	}

	after (otherElmOrSelector: HTMLElement | string) {
		const otherElm = getElm(otherElmOrSelector);

		otherElm?.parentNode?.insertBefore(this.elm, otherElm.nextSibling);
	}
}
