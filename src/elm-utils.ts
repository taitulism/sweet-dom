import type {AttributesObj, ElementContents} from './types';

export const setAttributes = (elm: HTMLElement, attrs: AttributesObj) => {
	for (const [key, value] of Object.entries(attrs)) {
		elm.setAttribute(key, value);
	}
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
