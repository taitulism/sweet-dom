export type ElementContent = string | Node | Array<Node>
export type StandardObject = {[key: string]: string | number};

export interface ElementAttributes {
	[key: string]: string | StandardObject;
}

export type HtmlTagName = keyof HTMLElementTagNameMap;
export type ElementSelector = {
	tag: HtmlTagName
	id?: string
	classnames?: Array<string>
}
