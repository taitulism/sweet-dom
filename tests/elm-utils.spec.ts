import * as jsdom from 'jsdom';
import {expect} from 'chai';
import {setElmStyle} from '../src';
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
};
