import type {AttributesObj, ElementContents} from './types';
import {forIn} from './for-in';

export const setAttributes = (elm: HTMLElement, attrs: AttributesObj) => {
	forIn(attrs, (key, value) => {
		elm.setAttribute(key, value);
	});
};

export const setStyle = (elm: HTMLElement, styleObj: Partial<CSSStyleDeclaration>) => {
	Object.assign(elm.style, styleObj);
};

export const setContent = (elm: HTMLElement, content: ElementContents) => {
	if (Array.isArray(content)) {
		elm.append(...content);
	}
	else {
		elm.append(content);
	}
};
