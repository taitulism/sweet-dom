import type {AttributesObj, DataObj, ElementContents, StyleObj} from './types';
import {forIn} from './for-in';

export function setAttributes (elm: HTMLElement, attrs: AttributesObj) {
	forIn(attrs, (key, value) => {
		elm.setAttribute(key, value);
	});
}

export function setStyle (elm: HTMLElement, style: StyleObj) {
	forIn(style, (cssKey, cssValue) => {
		// @ts-ignore
		elm.style[cssKey] = cssValue;
	});
}

export function setData (elm: HTMLElement, data: DataObj) {
	forIn(data, (dataKey, dataValue) => {
		elm.dataset[dataKey] = dataValue;
	});
}

export function setContent (elm: HTMLElement, content: ElementContents) {
	if (Array.isArray(content)) {
		elm.append(...content);
	}
	else {
		elm.append(content);
	}
}
