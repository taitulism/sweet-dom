import {expect} from 'chai';
import * as jsdom from 'jsdom';
import {bindEvent, bindEventOnce} from '../src/bind-event';
import {glb, setWinDoc} from './utils';

export const bindEventSpec = () => {
	let button: HTMLButtonElement | undefined;

	beforeEach((done) => {
		const dom = new jsdom.JSDOM('<button id="the-button">Click</button>');

		setWinDoc(dom);
		button = document.getElementById('the-button') as HTMLButtonElement;
		done();
	});

	afterEach(() => {
		glb.window.close();
		button = undefined;
		glb.window = undefined;
		glb.document = undefined;
	});

	it('binds a listener on an element', (done) => {
		const unbind = bindEvent(button!, 'click', (ev) => {
			expect(ev).to.be.ok;
			expect(ev.target).to.be.instanceOf(glb.window.HTMLButtonElement);
			unbind();
			done();
		});

		button!.click();
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
		const {body} = glb.window.document;

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
