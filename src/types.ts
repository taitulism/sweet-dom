export type UnknownObjectKey = string/*  | number */;
export type IterCallback = (key: UnknownObjectKey, value: unknown) => void;
export type UnknownObject = {
	[key: UnknownObjectKey]: unknown
}

export type HtmlTagName = keyof HTMLElementTagNameMap;

export type ElementAttributes = {
	[key: string]: string | UnknownObject;
}

export type ElementContent = string | Node | Array<Node>

export type ElementSelector = {
	tag: HtmlTagName
	id?: string
	classnames?: Array<string>
}
