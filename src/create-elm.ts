import {setStyle, setData, setContent, setAttributes} from './elm-utils';
import type {
	AllElementAttributes,
	AttributesObj,
	DataObj,
	ElementContents,
	ElementSelector,
	HtmlTagName,
	StyleObj,
} from './types';

const isContent = (attrsOrContent: AllElementAttributes | ElementContents) => (
	typeof attrsOrContent === 'string'
		|| attrsOrContent instanceof window.HTMLElement
		|| Array.isArray(attrsOrContent)
);

const parseElmSelector = (elmStr: string): ElementSelector => {
	const [tagAndId, ...classnames] = elmStr.split('.');
	const [tag, id] = tagAndId.split('#');

	return {
		tag: (tag || 'div') as HtmlTagName,
		id: id || undefined,
		classnames: classnames || undefined,
	};
};

const setAllElmAttributes = (elm: HTMLElement, attrs: AllElementAttributes) => {
	if (attrs.style) {
		setStyle(elm, attrs.style as StyleObj);
		delete attrs.style;
	}

	if (attrs.data) {
		setData(elm, attrs.data as DataObj);
		delete attrs.data;
	}

	setAttributes(elm, attrs as AttributesObj);
};

export const createElm = (
	elmStr: string,
	attrs?: AllElementAttributes | ElementContents,
	content?: ElementContents,
): HTMLElement => {
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
			setAllElmAttributes(elm, attrs as AllElementAttributes);
		}
	}

	if (content) setContent(elm, content);

	return elm;
};
