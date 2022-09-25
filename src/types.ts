export type Content = Node | string;
export type ElementContent = Content | Array<Node> // TODO: Array<Content>
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
