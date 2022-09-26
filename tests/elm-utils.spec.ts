import * as jsdom from 'jsdom';
import {expect} from 'chai';
import {setElmStyle, setElmData, setElmContent} from '../src';
import {glb, setWinDoc} from './utils';

export const elmUtilsSpec = () => {
	before(() => {
		const dom = new jsdom.JSDOM('');

		setWinDoc(dom);
	});

	after(() => {
		glb.window.close();
		glb.window = undefined;
		glb.document = undefined;
	});

	describe('setElmStyle(elm, styleObj)', () => {
		it('sets inline style on an element', () => {
			const elm = document.createElement('div');

			expect(elm.style.color).to.equal('');
			setElmStyle(elm, {color: 'red'});
			expect(elm.style.color).to.equal('red');
		});
	});

	describe('setElmData(elm, dataObj)', () => {
		it('sets data attributes on an element', () => {
			const elm = document.createElement('div');

			expect(elm.dataset.some).to.equal(undefined);
			setElmData(elm, {some: 'thing'});
			expect(elm.dataset.some).to.equal('thing');
		});
	});

	describe('setElmContent(elm, contents)', () => {
		it('appends text to an element', () => {
			const elm = document.createElement('div');
			const text = 'hello world';

			setElmContent(elm, text);
			expect(elm.textContent).to.equal(text);
		});

		it('appends a child element to a parent element', () => {
			const parent = document.createElement('div');
			const child = document.createElement('div');

			setElmContent(parent, child);
			expect(parent.children[0]).to.be.a('HTMLDivElement');
		});

		it('appends an array of mixed children to a parent element', () => {
			const parent = document.createElement('div');
			const elmChild1 = document.createElement('div');
			const textChild2 = 'hello ';
			const elmChild3 = document.createElement('div');
			const textChild4 = 'world';

			setElmContent(parent, [elmChild1, textChild2, elmChild3, textChild4]);

			expect(parent.childNodes[0]).to.be.a('HTMLDivElement');
			expect(parent.childNodes[1]).to.be.a('Text');
			expect(parent.childNodes[2]).to.be.a('HTMLDivElement');
			expect(parent.childNodes[3]).to.be.a('Text');
		});
	});
};
