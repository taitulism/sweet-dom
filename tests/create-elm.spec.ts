import * as jsdom from 'jsdom';
import {expect} from 'chai';
import {createElm} from '../src/create-elm';
import {glb, setWinDoc} from './utils';

export const createElmSpec = () => {
	before(() => {
		const dom = new jsdom.JSDOM('');

		setWinDoc(dom);
	});

	after(() => {
		glb.window.close();
		glb.window = undefined;
		glb.document = undefined;
	});

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

	it('creates an element with attributes', () => {
		const elm = createElm('input', {
			type: 'text',
			name: 'username',
			value: 'john',
		});

		expect(elm.nodeName).to.equal('INPUT');
		expect(elm.getAttribute('type')).to.equal('text');
		expect(elm.getAttribute('name')).to.equal('username');
		expect(elm.getAttribute('value')).to.equal('john');
		expect((elm as HTMLInputElement).value).to.equal('john');
	});

	it('creates an element with inline style', () => {
		const elm = createElm('div', {
			style: {
				width: '50px',
				height: '50px',
			},
		});

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.style.width).to.equal('50px');
		expect(elm.style.height).to.equal('50px');
	});

	it('creates an element with data attributes', () => {
		const elm = createElm('div', {
			data: {
				name: 'john',
				age: '30',
			},
		});

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.dataset.name).to.equal('john');
		expect(elm.dataset.age).to.equal('30');
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
		const childElm1 = createElm('div', 'child1 ');
		const childElm2 = createElm('div', 'child2 ');
		const childElm3 = createElm('div', 'child3');

		const elm = createElm('div', [childElm1, childElm2, childElm3]);

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.textContent).to.equal('child1 child2 child3');
	});

	it('creates an element with attributes and content', () => {
		const elm = createElm('div', {
			style: {backgroundColor: 'red'},
			data: {name: 'john'},
		}, 'red john');

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.style.backgroundColor).to.equal('red');
		expect(elm.dataset.name).to.equal('john');
		expect(elm.textContent).to.equal('red john');
	});
};
