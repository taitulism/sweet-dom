import {setElmStyle, setElmData, setElmContent} from './elm-utils';
import {forIn} from './for-in';
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
			setElmContent(elm, attrs as ElementContents);
		}
		else {
			setElmAttributes(elm, attrs as ElementAttributes);
		}
	}

	if (content) setElmContent(elm, content);

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

function setElmAttributes (elm: HTMLElement, attrs: ElementAttributes) {
	forIn(attrs, (key, value) => {
		if (key === 'style') {
			const style = value as StandardObject;

			setElmStyle(elm, style);
		}
		else if (key === 'data') {
			const data = value as StandardObject;

			setElmData(elm, data);
		}
		else {
			elm.setAttribute(key as string, value as string);
		}
	});
}
