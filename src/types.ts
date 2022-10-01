// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Obj<K extends keyof any, V> = {
	[key in K]: V;
};

export type Dictionary<V = string> = Obj<string, V>
export type UnknownObject = Obj<string, unknown>

export type Content = Node | string
export type ElementContents = Content | Array<Content>
export type AttributesObj = Dictionary // TODO:ts {[K in keyof Attr]: string}

export type HtmlTagName = keyof HTMLElementTagNameMap
export type ElementSelector = {
	tag: HtmlTagName
	id?: string
	classnames?: Array<string>
}
