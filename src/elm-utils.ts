import type {AttributesObj, ElementContents, StyleObj} from './types';
import {forIn} from './for-in';

export const setAttributes = (elm: HTMLElement, attrs: AttributesObj) => {
	forIn(attrs, (key, value) => {
		elm.setAttribute(key, value);
	});
};

export const setStyle = (elm: HTMLElement, style: StyleObj) => {
	forIn(style, (cssKey, cssValue) => {
		// @ts-ignore
		elm.style[cssKey] = cssValue;
	});
};

export const setContent = (elm: HTMLElement, content: ElementContents) => {
	if (Array.isArray(content)) {
		elm.append(...content);
	}
	else {
		elm.append(content);
	}
};
