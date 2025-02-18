import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {JSDOM, DOMWindow} from 'jsdom';
import {bindEvent, bindEventOnce} from '../src/bind-event';

export const bindEventSpec = () => {
	let button: HTMLButtonElement | undefined;
	let document: Document;
	let window: DOMWindow;

	beforeEach(() => {
		const dom = new JSDOM('<button id="the-button">Click</button>');

		/* eslint-disable prefer-destructuring */
		window = dom.window;
		document = dom.window.document;
		/* eslint-enable prefer-destructuring */

		button = document.getElementById('the-button') as HTMLButtonElement;
	});

	afterEach(() => {
		window.close();
		button = undefined;
	});

	it('binds a listener on an element', () => {
		let clicked = false;

		const unbind = bindEvent(button!, 'click', (ev) => {
			expect(ev).toBeTruthy();
			expect(ev.target).to.be.instanceOf(window.HTMLButtonElement);
			clicked = true;
			unbind();
		});

		button!.click();
		expect(clicked).toBe(true);
	});

	it('returns a remove listener function', () => {
		let callsCount = 0;
		const unbind = bindEvent(button!, 'click', () => callsCount++);

		expect(unbind).to.be.a('function');
		expect(callsCount).to.equal(0);
		button!.click();
		expect(callsCount).to.equal(1);
		button!.click();
		expect(callsCount).to.equal(2);
		unbind();
		button!.click();
		expect(callsCount).to.equal(2);
	});

	it('accepts a `useCapture` boolean', () => {
		const occurences: Array<string> = [];
		const expectedResult = ['body capture', 'button', 'body bubble'];
		const {body} = document;

		const unbind1 = bindEvent(body, 'click', () => {
			occurences.push('body bubble');
		}, false);

		const unbind2 = bindEvent(body, 'click', () => {
			occurences.push('body capture');
		}, true);

		const unbind3 = bindEvent(button!, 'click', () => {
			occurences.push('button');
		});

		button!.click();
		expect(occurences).to.deep.equal(expectedResult);
		unbind1();
		unbind2();
		unbind3();
	});

	describe('bindEventOnce()', () => {
		it('binds one-time listener on an element', () => {
			let callsCount = 0;
			const unbind = bindEventOnce(button!, 'click', () => callsCount++);

			expect(callsCount).to.equal(0);
			button!.click();
			expect(callsCount).to.equal(1);
			button!.click();
			expect(callsCount).to.equal(1);
			unbind();
		});

		it('returns a remove listener function', () => {
			let callsCount = 0;
			const unbind = bindEventOnce(button!, 'click', () => callsCount++);

			expect(unbind).to.be.a('function');
			button!.click();
			expect(callsCount).to.equal(1);
			button!.click();
			expect(callsCount).to.equal(1);
			unbind();
			button!.click();
			expect(callsCount).to.equal(1);
		});
	});

};
