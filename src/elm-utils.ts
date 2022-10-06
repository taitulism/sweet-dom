import type {AttributesObj} from './types';

export const setAttributes = (elm: HTMLElement, attrs: AttributesObj) => {
	for (const [key, value] of Object.entries(attrs)) {
		elm.setAttribute(key, value);
	}
};

export const setStyle = (elm: HTMLElement, styleObj: Partial<CSSStyleDeclaration>) => {
	Object.assign(elm.style, styleObj);
};
