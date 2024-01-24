import type {SelectorContext} from './types';

/*
 * `querySelectorAll` returns a static NodeList.
 * `getElementsByClassName` & `getElementsByTagName` return a live HTMLCollection.
*/

export const $ = <T extends HTMLElement>(
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelector<T>(qryStr);

export const $$ = <T extends HTMLElement>(
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelectorAll<T>(qryStr);

export const $id = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;

export const $class = <T extends HTMLElement>(
	classNames: string,
	ctx: SelectorContext = document,
) => ctx.getElementsByClassName<T>(classNames);

export const $tag = <T extends keyof HTMLElementTagNameMap>(
	tagName: T,
	ctx: SelectorContext = document,
) => ctx.getElementsByTagName<typeof tagName>(tagName);
