import {expect} from 'chai';
import { JSDOM } from 'jsdom';
import {bindEvent, bindEventOnce} from '../../src/bind-event';

const setWinDoc = (dom) => {
	globalThis.window = dom.window;
	globalThis.document = dom.window.document;
};

export const bindEventSpec = () => {
	let button;
	beforeEach(() => {
		if (!globalThis.isBrowser) {
			JSDOM.fromFile('./tests/events/events.html').then((dom) => {
				setWinDoc(dom);
				button = document.getElementById('the-button');
			});
		}
	});

	afterEach(() => {
		if (!globalThis.isBrowser) {
			globalThis.window.close();
			button = null;
			globalThis.window = null;
			globalThis.document = null;
		}
	});

	it('is a function', () => expect(on).to.be.a('function'));

	it('binds listeners on elements', () => {
		let called = false;
		let event;

		on(button, 'click', (ev) => {
			called = true;
			event = ev;
		});

		button.click();
		expect(called).to.be.true;
		expect(event).to.be.ok;
		expect(event.target).to.be.instanceOf(globalThis.window.HTMLElement);
	});

	it('accepts a mix-up of the first two arguments', () => {
		let called = false;
		let event;

		on('click', button, (ev) => {
			called = true;
			event = ev;
		});

		button.click();
		expect(called).to.be.true;
		expect(event).to.be.ok;
		expect(event.target).to.be.instanceOf(globalThis.window.HTMLElement);
	});

	it('returns an event destruction function', () => {
		let callsCount = 0;

		const off = on(button, 'click', () => callsCount++);

		expect(callsCount).to.equal(0);
		button.click();
		expect(callsCount).to.equal(1);
		button.click();
		expect(callsCount).to.equal(2);
		off();
		button.click();
		expect(callsCount).to.equal(2);
	});

	it('provides a `hover` event', (done) => {
		let hoverCallesCount = 0;

		on(button, 'hover', () => {
			hoverCallesCount++;
		});

		const mouseEnterEvent = new globalThis.window.Event('mouseenter');
		const mouseLeaveEvent = new globalThis.window.Event('mouseleave');

		expect(hoverCallesCount).to.equal(0);
		button.dispatchEvent(mouseEnterEvent);
		expect(hoverCallesCount).to.equal(1);

		setTimeout(() => {
			button.dispatchEvent(mouseLeaveEvent);
			expect(hoverCallesCount).to.equal(2);
			done();
		}, 0);
	});

	it('provides a `hover` event with two callbacks', (done) => {
		let enterCalled = false;
		let leaveCalled = false;
		let enterEvent, leaveEvent;

		on(button, 'hover', (ev) => {
			enterCalled = true;
			enterEvent = ev;
		}, (ev) => {
			leaveCalled = true;
			leaveEvent = ev;
		});

		const mouseEnterEvent = new globalThis.window.Event('mouseenter');
		const mouseLeaveEvent = new globalThis.window.Event('mouseleave');

		button.dispatchEvent(mouseEnterEvent);

		expect(enterCalled).to.be.true;
		expect(enterEvent.target).to.be.instanceOf(globalThis.window.HTMLElement);

		setTimeout(() => {
			button.dispatchEvent(mouseLeaveEvent);

			expect(leaveCalled).to.be.true;
			expect(leaveEvent.target).to.be.instanceOf(globalThis.window.HTMLElement);

			done();
		}, 0);
	});
};
