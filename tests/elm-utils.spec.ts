import * as jsdom from 'jsdom';
import {expect} from 'chai';
import {setAttributes, setStyle} from '../src';
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

	describe('setAttributes(elm, attrs)', () => {
		it('sets attributes on an element', () => {
			const elm = document.createElement('input');

			expect(elm.getAttribute('type')).to.equal(null);
			expect(elm.getAttribute('name')).to.equal(null);

			setAttributes(elm, {type: 'number', name: 'age'});

			expect(elm.getAttribute('type')).to.equal('number');
			expect(elm.getAttribute('name')).to.equal('age');
		});
	});

	describe('setStyle(elm, styleObj)', () => {
		it('sets inline style on an element', () => {
			const elm = document.createElement('div');

			expect(elm.style.color).to.equal('');
			setStyle(elm, {color: 'red'});
			expect(elm.style.color).to.equal('red');
		});
	});
};
