import {$, createElm, bindEvent, bindEventOnce} from '../src';

// #region Setup & Types
declare global {
	interface Window {
		$: typeof $;
		createElm: typeof createElm;
		bindEvent: typeof bindEvent;
		bindEventOnce: typeof bindEventOnce;
	}
}

window.$ = $;
window.createElm = createElm;
window.bindEvent = bindEvent;
window.bindEventOnce = bindEventOnce;

// #endregion
/* -------------------------------------------------- */

const link = createElm('a', {href: 'http://google.com'});
link.textContent = 'Click';

document.body.appendChild(link);
