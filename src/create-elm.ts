import {forIn} from './for-in';
import type {
	ElementAttributes,
	ElementContent,
	ElementSelector,
	HtmlTagName,
	UnknownObject,
} from '~types';

// TODO: Types. All over (include forIn)

export function createElm (
	elmStr: string,
	attrs?: ElementAttributes | ElementContent,
	content?: ElementContent,
): HTMLElement {
	const {tag, id, classnames} = parseElmSelector(elmStr);
	const elm = document.createElement(tag);

	if (id) elm.id = id;

	if (classnames?.length) {
		elm.classList.add(...classnames);
	}

	if (attrs) {
		if (isContent(attrs)) {
			setElmContent(elm, attrs as ElementContent);
		}
		else {
			setElmAttributes(elm, attrs as ElementAttributes);
		}
	}

	if (content) setElmContent(elm, content);

	return elm;
}

function isContent (attrsOrContent: ElementAttributes | ElementContent) {
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
			setElmStyle(elm, value);
		}
		else if (key === 'data') {
			setElmData(elm, value);
		}
		else {
			elm.setAttribute(key, value);
		}
	});
}

function setElmStyle (elm: HTMLElement, style: UnknownObject) {
	forIn(style, (cssKey, cssValue) => {
		elm.style[cssKey] = cssValue;
	});
}

function setElmData (elm: HTMLElement, data: UnknownObject) {
	forIn(data, (dataKey, dataValue) => {
		elm.dataset[dataKey] = dataValue;
	});
}

function setElmContent (elm: HTMLElement, content: ElementContent) {
	if (typeof content === 'string') {
		elm.textContent = content;
	}
	else if (content instanceof window.HTMLElement) {
		elm.appendChild(content);
	}
	else if (Array.isArray(content)) {
		content.forEach((child) => {
			elm.appendChild(child);
		});
	}
}
