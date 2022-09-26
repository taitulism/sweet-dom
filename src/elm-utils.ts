import type {StandardObject} from './types';
import {forIn} from './for-in';

// TODO: CSSStyleDeclaration
export function setElmStyle (elm: HTMLElement, style: StandardObject) {
	forIn(style, (cssKey, cssValue) => {
		// @ts-ignore
		elm.style[cssKey] = cssValue;
	});
}

export function setElmData (elm: HTMLElement, data: StandardObject) {
	forIn(data, (dataKey, dataValue) => {
		elm.dataset[dataKey] = dataValue as string;
	});
}
