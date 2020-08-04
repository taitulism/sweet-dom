const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {on} = require('../../');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('on', () => {
	beforeEach(() => JSDOM.fromFile('./tests/events/events.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(on).to.be.a('function'));

	it('binds listeners on elements', () => {
		const elm = document.getElementById('the-button');
		let called = false;
		let event;

		on('click', elm, (ev) => {
			called = true;
			event = ev;
		});

		elm.click();
		expect(called).to.be.true;
		expect(event).to.be.ok;
		expect(event.target).to.be.instanceOf(global.window.HTMLElement);
	});

	it('returns an event destruction function', () => {
		const elm = document.getElementById('the-button');
		let callsCount = 0;

		const off = on('click', elm, () => callsCount++);

		expect(callsCount).to.equal(0);
		elm.click();
		expect(callsCount).to.equal(1);
		elm.click();
		expect(callsCount).to.equal(2);
		off();
		elm.click();
		expect(callsCount).to.equal(2);
	});

	it('provides a `hover` event', (done) => {
		const elm = document.getElementById('the-button');
		let hoverCallesCount = 0;

		on('hover', elm, () => {
			hoverCallesCount++;
		});

		const mouseEnterEvent = new global.window.Event('mouseenter');
		const mouseLeaveEvent = new global.window.Event('mouseleave');

		expect(hoverCallesCount).to.equal(0);
		elm.dispatchEvent(mouseEnterEvent);
		expect(hoverCallesCount).to.equal(1);

		setTimeout(() => {
			elm.dispatchEvent(mouseLeaveEvent);
			expect(hoverCallesCount).to.equal(2);
			done();
		}, 0);
	});

	it('provides a `hover` event with two callbacks', (done) => {
		const elm = document.getElementById('the-button');
		let enterCalled = false;
		let leaveCalled = false;
		let enterEvent, leaveEvent;

		on('hover', elm, (ev) => {
			enterCalled = true;
			enterEvent = ev;
		}, (ev) => {
			leaveCalled = true;
			leaveEvent = ev;
		});

		const mouseEnterEvent = new global.window.Event('mouseenter');
		const mouseLeaveEvent = new global.window.Event('mouseleave');

		elm.dispatchEvent(mouseEnterEvent);

		expect(enterCalled).to.be.true;
		expect(enterEvent.target).to.be.instanceOf(global.window.HTMLElement);

		setTimeout(() => {
			elm.dispatchEvent(mouseLeaveEvent);

			expect(leaveCalled).to.be.true;
			expect(leaveEvent.target).to.be.instanceOf(global.window.HTMLElement);

			done();
		}, 0);
	});
});
