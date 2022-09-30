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
	/* -Archived-
		inside (
			parentOrSelector: HTMLElement | string,
			index: number = -1,
			withNodes: boolean = false,
		) {
			const parent = getElm(parentOrSelector);

			if (!parent) return;

			const children = withNodes ? parent.childNodes : parent.children;

			index = index >= 0 ? index : children.length + 1 + index;

			const otherElm = children[index] || null;

			parent.insertBefore(this.elm, otherElm);
		}
	*/
}
