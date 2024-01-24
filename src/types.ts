/*
Add generics to `getElementsByClassName` & `getElementsByTagName`
Default is `HTMLElement` instead of `Element`.

This probably won't work for SVG elements and maybe other tags.
The issue is that those methods are also used in XML
*/
declare global {
	interface Document {
		getElementsByClassName<T extends HTMLElement>(classNames: string): HTMLCollectionOf<T>;
	}
	interface Element {
		getElementsByClassName<T extends HTMLElement>(classNames: string): HTMLCollectionOf<T>;
	}
}

export type SelectorContext = Document | HTMLElement

export type Content = Node | string
export type AttributesObj = {[key: string]: string;} // TODO:ts {[K in keyof Attr]: string}

export type HtmlTagName = keyof HTMLElementTagNameMap
export type ElementSelector = {
	tag: HtmlTagName
	id?: string
	classnames?: Array<string>
}
