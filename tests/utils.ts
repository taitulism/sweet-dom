import {JSDOM} from 'jsdom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const glb = (globalThis as any);

glb.isBrowser = typeof glb.isBrowser === 'undefined'
	? Boolean(glb.window)
	: glb.isBrowser
;

export const setWinDoc = (dom: JSDOM) => {
	glb.window = dom.window;
	glb.document = dom.window.document;
};
