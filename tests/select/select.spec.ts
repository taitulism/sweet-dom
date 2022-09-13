import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import {$, $$, $id, $cls, $tag} from '../../src/select-elm';

const setWinDoc = (dom) => {
	globalThis.window = dom.window;
	globalThis.document = dom.window.document;
};

export const selectElmSpec = () => {
	before((done) => {
		if (!globalThis.isBrowser) {
			JSDOM.fromFile('./tests/select/select.html').then((dom) => {
				setWinDoc(dom);
				done();
			});
		}
	});

	after(() => {
		if (!globalThis.isBrowser) {
			globalThis.window.close();
			globalThis.window = undefined;
			globalThis.document = undefined;
		}
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

	describe('$cls', () => {
		it('returns an array', () => {
			const elms = $cls('box');

			expect(elms).to.be.an('array');
		});

		it('$cls - single classname', () => {
			const elms = $cls('box');

			expect(elms.length).to.equal(4);
			expect(elms[0].nodeName).to.equal('SECTION');
			expect(elms[1].nodeName).to.equal('DIV');
			expect(elms[2].nodeName).to.equal('DIV');
			expect(elms[3].nodeName).to.equal('SPAN');
		});

		it('$cls - with context', () => {
			const ctx = $id('side-menu')!;
			const elms = $cls('box', ctx);

			expect(elms.length).to.equal(1);
			expect(elms[0].nodeName).to.equal('SPAN');
		});

		it('$cls - multiple classnames', () => {
			const elms = $cls('special box');

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
			expect(elms[0].textContent).to.equal('box-b');
			expect(elms[1].textContent).to.equal('box-c');
		});

		it('$tag - with context', () => {
			const ctx = $id('side-menu')!;
			const elms = $tag('div', ctx);

			expect(elms.length).to.equal(1);
			expect(elms[0].textContent).to.equal('box-f');
		});
	});
};
