import { forIn } from './for-in';

export function createElm (
	elmStr?: string,
	attrs?: {[key: string]: unknown},
	styles?: CSSStyleDeclaration,
	// children: any,
): HTMLElement {
	if (!elmStr) return document.createElement('div');

	const [tagAndId, ...classnames] = elmStr.split('.');
	let [tag, id] = tagAndId.split('#');

	tag = tag || 'div';
	id = id || null;

	const elm = document.createElement(tag);

	if (id) elm.id = id;
	if (classnames.length) elm.classList.add(...classnames);

	if (attrs) {
		forIn(attrs, (key, value) => {
			elm.setAttribute(key, value);
		});
	}

	if (styles) {
		forIn(styles, (key, value) => {
			elm.style[key] = value;
		});
	}

	// if (children) {
	// 	if (typeof children === 'string') {
	// 		elm.textContent = children;
	// 	}
	// 	else if (Array.isArray(children)) {
	// 		children.forEach((child) => {
	// 			elm.appendChild(child);
	// 		})
	// 	}
	// 	else {
	// 		elm.appendChild(children);
	// 	}
	// }

	return elm;
}
