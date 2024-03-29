import {it, expect} from 'vitest';
import {createElm} from '../src/create-elm';

export const createElmSpec = () => {
	it('creates HTML elements', () => {
		expect(createElm('a').nodeName).to.equal('A');
		expect(createElm('p').nodeName).to.equal('P');
		expect(createElm('span').nodeName).to.equal('SPAN');
	});

	it('creates an element with an id', () => {
		const elm = createElm('h1#the-elm');

		expect(elm.nodeName).to.equal('H1');
		expect(elm.id).to.equal('the-elm');
	});

	it('creates an element with a classname', () => {
		const elm = createElm('h1.first-class');

		expect(elm.nodeName).to.equal('H1');
		expect(elm.classList.contains('first-class')).to.be.true;
	});

	it('creates an element with multiple classnames', () => {
		const elm = createElm('p.first-class.second-class');

		expect(elm.nodeName).to.equal('P');
		expect(elm.classList.contains('first-class')).to.be.true;
		expect(elm.classList.contains('second-class')).to.be.true;
	});

	it('creates an element with an id and classnames', () => {
		const elm = createElm('a#the-link.first-class.second-class');

		expect(elm.nodeName).to.equal('A');
		expect(elm.id).to.equal('the-link');
		expect(elm.classList.contains('first-class')).to.be.true;
		expect(elm.classList.contains('second-class')).to.be.true;
	});

	it('creates a `div` by default', () => {
		const elm1 = createElm('#the-id');
		const elm2 = createElm('.some.classes');
		const elm3 = createElm('#the-id.the-class');

		expect(elm1.nodeName).to.equal('DIV');
		expect(elm2.nodeName).to.equal('DIV');
		expect(elm3.nodeName).to.equal('DIV');
		expect(elm1.id).to.equal('the-id');
		expect(elm2.classList.contains('some')).to.be.true;
		expect(elm2.classList.contains('classes')).to.be.true;
		expect(elm3.id).to.equal('the-id');
		expect(elm3.classList.contains('the-class')).to.be.true;
	});

	it('creates an element with text', () => {
		const elm = createElm('div', 'hello');

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.textContent).to.equal('hello');
	});

	it('creates an element with a child', () => {
		const childElm = createElm('div', 'child');
		const elm = createElm('div', childElm);

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.textContent).to.equal('child');
	});

	it('creates an element with children', () => {
		const childElm1 = createElm('div', 'child1');
		const childText2 = ' child2 ';
		const childElm3 = createElm('div', 'child3');

		const elm = createElm('div', childElm1, childText2, childElm3);

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.textContent).to.equal('child1 child2 child3');
	});
};
