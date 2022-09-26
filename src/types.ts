// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Obj<K extends keyof any, V> = {
	[key in K]: V;
};

export type Dictionary<V = string> = Obj<string, V>
export type UnknownObject = Obj<string, unknown>

export type Content = Node | string
export type ElementContents = Content | Array<Content>

export type DataObj = Dictionary
export type StyleObj = Dictionary                // TODO:ts Partial<CSSStyleDeclaration>
export type AttributesObj = Dictionary           // TODO:ts {[K in keyof Attr]: string}
export type AllElementAttributes = UnknownObject // TODO:ts AttributesObj & SpecificAttributes

// export type SpecificAttributes = {
// 	style?: StyleObj
// 	data?: DataObj
// }

export type HtmlTagName = keyof HTMLElementTagNameMap
export type ElementSelector = {
	tag: HtmlTagName
	id?: string
	classnames?: Array<string>
}
