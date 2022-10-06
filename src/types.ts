export type Content = Node | string
export type AttributesObj = {[key: string]: string;} // TODO:ts {[K in keyof Attr]: string}

export type HtmlTagName = keyof HTMLElementTagNameMap
export type ElementSelector = {
	tag: HtmlTagName
	id?: string
	classnames?: Array<string>
}
