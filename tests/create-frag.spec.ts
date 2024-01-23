import {it, expect} from 'vitest';
import {createFrag} from '../src/create-frag';

export const createFragSpec = () => {
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
