import {describe, it, expect, beforeAll, afterAll} from 'vitest';
import {JSDOM, DOMWindow} from 'jsdom';
import {$, $$, $id, $class, $tag} from '../src/select-elm';
import {jsdomOpts} from './common';

export const selectElmSpec = () => {
	let defaultGlobalDocument: Document;
	let window: DOMWindow;
	let document: Document;

	beforeAll(() => JSDOM.fromFile('./tests/html/select-elm.html', jsdomOpts).then((dom) => {
		/* eslint-disable prefer-destructuring */
		window = dom.window;
		document = dom.window.document;
		/* eslint-enable prefer-destructuring */

		defaultGlobalDocument = globalThis.document;
		globalThis.document = document;
	}));

	afterAll(() => {
		window.close();
		globalThis.document = defaultGlobalDocument;
	});

	describe('$', () => {
		it('selects using native `querySelector`', () => {
			const elm = $('*[class=box]')!;

			expect(elm.nodeName).to.equal('DIV');
		});

		it('selects using native `querySelector` - with context', () => {
			const ctx = document.getElementById('side-menu')!;
			const elm = $('*[class=box]', ctx)!;

			expect(elm.nodeName).to.equal('SPAN');
		});
	});

	describe('$$', () => {
		it('returns an array', () => {
			const elms = $$('*[class=box]');

			expect(elms).to.be.an('array');
		});

		it('selects using native `querySelectorAll`', () => {
			const elms = $$('section, [class=box]');

			expect(elms).to.have.lengthOf(4);
			expect(elms[0].nodeName).to.equal('SECTION');
			expect(elms[1].nodeName).to.equal('DIV');
			expect(elms[2].nodeName).to.equal('DIV');
			expect(elms[3].nodeName).to.equal('SPAN');
		});

		it('selects using native `querySelectorAll` - with context', () => {
			const ctx = document.getElementById('side-menu')!;
			const elms = $$('*[class=box]', ctx);

			expect(elms).to.have.lengthOf(1);
			expect(elms[0].nodeName).to.equal('SPAN');
		});
	});

	describe('$id', () => {
		it('selects an element by id', () => {
			const elm = $id('root')!;

			expect(elm.nodeName).to.equal('MAIN');
		});
	});

	describe('$class', () => {
		it('returns an array', () => {
			const elms = $class('box');

			expect(elms).to.be.an('array');
		});

		it('$class - single classname', () => {
			const elms = $class('box');

			expect(elms.length).to.equal(4);
			expect(elms[0].nodeName).to.equal('SECTION');
			expect(elms[1].nodeName).to.equal('DIV');
			expect(elms[2].nodeName).to.equal('DIV');
			expect(elms[3].nodeName).to.equal('SPAN');
		});

		it('$class - with context', () => {
			const ctx = $id('side-menu')!;
			const elms = $class('box', ctx);

			expect(elms.length).to.equal(1);
			expect(elms[0].nodeName).to.equal('SPAN');
		});

		it('$class - multiple classnames', () => {
			const elms = $class('special box');

			expect(elms.length).to.equal(1);
			expect(elms[0].nodeName).to.equal('SECTION');
		});
	});

	describe('$tag', () => {
		it('returns an array', () => {
			const elms = $tag('div');

			expect(elms).to.be.an('array');
		});

		it('$tag', () => {
			const elms = $tag('div');

			expect(elms.length).to.equal(3);
			expect(elms[0].textContent).to.equal('A');
			expect(elms[1].textContent).to.equal('B');
			expect(elms[2].textContent).to.equal('D');
		});

		it('$tag - with context', () => {
			const ctx = $id('side-menu')!;
			const elms = $tag('div', ctx);

			expect(elms.length).to.equal(1);
			expect(elms[0].textContent).to.equal('D');
		});
	});
};
