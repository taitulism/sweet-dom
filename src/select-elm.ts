import type {SelectorContext} from './types';

export const $ = <T extends HTMLElement>(
	qryStr: string,
	ctx: SelectorContext = document,
) => ctx.querySelector<T>(qryStr);

export const $$ = <T extends HTMLElement>(
	qryStr: string,
	ctx: SelectorContext = document,
) => Array.from(ctx.querySelectorAll<T>(qryStr));

export const $id = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;

export const $class = <T extends HTMLElement>(
	classNames: string,
	ctx: SelectorContext = document,
) => Array.from(ctx.getElementsByClassName<T>(classNames));

export const $tag = <T extends keyof HTMLElementTagNameMap>(
	tagName: T,
	ctx: SelectorContext = document,
) => Array.from(ctx.getElementsByTagName<typeof tagName>(tagName));
