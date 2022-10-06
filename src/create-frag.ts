import {Content} from './types';

export const createFrag = (...contents: Array<Content>): DocumentFragment => {
	const frag = document.createDocumentFragment();

	contents.length && frag.append(...contents);

	return frag;
};
