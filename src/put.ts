export function put (elm: HTMLElement) {
	return new Put(elm);
}

class Put {
	elm: HTMLElement;

	constructor (elm: HTMLElement) {
		this.elm = elm;
	}

	before (otherElm: HTMLElement) {
		otherElm.parentNode?.insertBefore(this.elm, otherElm);
	}

	after (otherElm: HTMLElement) {
		otherElm.parentNode?.insertBefore(this.elm, otherElm.nextSibling);
	}

	instead (otherElm: HTMLElement) {
		otherElm.parentNode?.replaceChild(this.elm, otherElm);
	}

	inside (parent: HTMLElement, index: number = -1, withNodes: boolean = false) {
		const children = withNodes ? parent.childNodes : parent.children;

		index = index >= 0 ? index : children.length + 1 + index;

		const otherElm = children[index] || null;

		parent.insertBefore(this.elm, otherElm);
	}
}
