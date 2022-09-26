import {setStyle, setData, setContent, setAttributes} from './elm-utils';
import type {
	ElementAttributes,
	ElementContents,
	ElementSelector,
	HtmlTagName,
	StandardObject,
} from './types';

// TODO: Types. All over (include forIn)

export function createElm (
	elmStr: string,
	attrs?: ElementAttributes | ElementContents,
	content?: ElementContents,
): HTMLElement {
	const {tag, id, classnames} = parseElmSelector(elmStr);
	const elm = document.createElement(tag);

	if (id) elm.id = id;

	if (classnames?.length) {
		elm.classList.add(...classnames);
	}

	if (attrs) {
		if (isContent(attrs)) {
			setContent(elm, attrs as ElementContents);
		}
		else {
			setAllElmAttributes(elm, attrs as ElementAttributes);
		}
	}

	if (content) setContent(elm, content);

	return elm;
}

function isContent (attrsOrContent: ElementAttributes | ElementContents) {
	return (
		typeof attrsOrContent === 'string'
		|| attrsOrContent instanceof window.HTMLElement
		|| Array.isArray(attrsOrContent)
	);
}

function parseElmSelector (elmStr: string): ElementSelector {
	const [tagAndId, ...classnames] = elmStr.split('.');
	const [tag, id] = tagAndId.split('#');

	return {
		tag: (tag || 'div') as HtmlTagName,
		id: id || undefined,
		classnames: classnames || undefined,
	};
}

function setAllElmAttributes (elm: HTMLElement, attrs: ElementAttributes) {
	if (attrs.style) {
		setStyle(elm, attrs.style as StandardObject);
		delete attrs.style;
	}

	if (attrs.data) {
		setData(elm, attrs.data as StandardObject);
		delete attrs.data;
	}

	setAttributes(elm, attrs as StandardObject);
}
