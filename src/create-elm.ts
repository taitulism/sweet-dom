import type {
	Content,
	ElementSelector,
	HtmlTagName,
} from './types';

const BY_DOT = '.';
const BY_HASH_SIGN = '#';
const DIV = 'div';

const parseElmSelector = (elmStr: string): ElementSelector => {
	const [tagAndId, ...classnames] = elmStr.split(BY_DOT);
	const [tag, id] = tagAndId.split(BY_HASH_SIGN);

	return {
		tag: (tag || DIV) as HtmlTagName,
		id: id || undefined,
		classnames: classnames || undefined,
	};
};

export const createElm = (
	elmStr: string,
	...contents: Array<Content>
): HTMLElement => {
	const {tag, id, classnames} = parseElmSelector(elmStr);
	const elm = document.createElement(tag);

	if (id) elm.id = id;

	if (classnames?.length) {
		elm.classList.add(...classnames);
	}

	contents.length && elm.append(...contents);

	return elm;
};
