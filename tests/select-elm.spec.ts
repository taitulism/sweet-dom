import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import {$, $$} from '../src/select-elm';
import {glb, setWinDoc} from './utils';

export const selectElmSpec = () => {
	before((done) => {
		JSDOM.fromFile('./tests/html/select-elm.html').then((dom) => {
			setWinDoc(dom);
			done();
		});
	});

	after(() => {
		glb.window.close();
		glb.window = undefined;
		glb.document = undefined;
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
		it('returns a NodeList', () => {
			const elms = $$('*[class=box]');

			expect(elms).to.be.an('NodeList');
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
};
