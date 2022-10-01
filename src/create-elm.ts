import {setContent} from './elm-utils';
import type {
	ElementContents,
	ElementSelector,
	HtmlTagName,
} from './types';

const parseElmSelector = (elmStr: string): ElementSelector => {
	const [tagAndId, ...classnames] = elmStr.split('.');
	const [tag, id] = tagAndId.split('#');

	return {
		tag: (tag || 'div') as HtmlTagName,
		id: id || undefined,
		classnames: classnames || undefined,
	};
};

export const createElm = (
	elmStr: string,
	content?: ElementContents,
): HTMLElement => {
	const {tag, id, classnames} = parseElmSelector(elmStr);
	const elm = document.createElement(tag);

	if (id) elm.id = id;

	if (classnames?.length) {
		elm.classList.add(...classnames);
	}

	if (content) setContent(elm, content);

	return elm;
};
