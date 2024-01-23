import type {SelectorContext} from './types';

/*
 * `querySelectorAll` returns a static NodeList.
 * `getElementsByClassName` & `getElementsByTagName` return a live HTMLCollection.
*/

export const $ = (
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelector(qryStr);

export const $$ = (
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelectorAll(qryStr);

export const $id = (id: string) => document.getElementById(id);

export const $class = (
	classNames: string,
	ctx: SelectorContext = document,
) => Array.from(ctx.getElementsByClassName(classNames));

export const $tag = (
	tagName: string,
	ctx: SelectorContext = document,
) => Array.from(ctx.getElementsByTagName(tagName));
