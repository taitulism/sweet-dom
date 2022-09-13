type SelectorContext = Document | HTMLElement

/*
The getElementsByClassName() and getElementsByTagName() methods return a live HTMLCollection.

The querySelectorAll() method returns a static NodeList.
*/

export const $ = (
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelector(qryStr);

export const $$ = (
	qryStr: string,
	ctx: SelectorContext = document,
) => {
	const nodeList = ctx.querySelectorAll(qryStr);

	return Array.from(nodeList);
};

export const $id = (id: string) => document.getElementById(id);

export const $cls = (
	classNames: string,
	ctx: SelectorContext = document,
) => {
	const nodeList = ctx.getElementsByClassName(classNames);

	return Array.from(nodeList);
};

export const $tag = (
	tagName: string,
	ctx: SelectorContext = document,
) => {
	const nodeList = ctx.getElementsByTagName(tagName);

	return Array.from(nodeList);
};
