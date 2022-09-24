type SelectorContext = Document | HTMLElement

export const $ = (
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelector(qryStr);

export const $$ = (
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelectorAll(qryStr);
