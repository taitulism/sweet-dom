import * as jsdom from 'jsdom';
import {expect} from 'chai';
import {createFrag} from '../src/create-frag';
import {glb, setWinDoc} from './utils';

export const createFragSpec = () => {
	before(() => {
		const dom = new jsdom.JSDOM('');

		setWinDoc(dom);
	});

	after(() => {
		glb.window.close();
		glb.window = undefined;
		glb.document = undefined;
	});

	it('creates a document fragment', () => {
		expect(createFrag()).to.be.a('DocumentFragment');
	});

	it('creates a document fragment with children arguments', () => {
		const elm1 = document.createElement('div');
		const elm2 = document.createElement('div');
		const elm3 = document.createElement('div');

		const frag = createFrag(elm1, elm2, 'some text', elm3);

		expect(frag.childNodes.length).to.equal(4);
		expect(frag.childElementCount).to.equal(3);
		expect(frag.childNodes[2].textContent).to.contain('some text');
	});
};
