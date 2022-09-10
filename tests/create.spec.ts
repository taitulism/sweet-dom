import {expect} from 'chai';
import * as jsdom from 'jsdom';
import {createElm} from '../src/create-elm';

const setWinDoc = (dom) => {
	globalThis.window = dom.window;
	globalThis.document = dom.window.document;
};

export const createElmSpec = () => {
	before(() => {
		if (!globalThis.isBrowser) {
			const dom = new jsdom.JSDOM('');
			setWinDoc(dom);
		}
	});

	after(() => {
		if (!globalThis.isBrowser) {
			globalThis.window.close();
			globalThis.window = null;
			globalThis.document = null;
		}
	});

	it('creates a `div` by default', () => {
		const elm = createElm();
		expect(elm.nodeName).to.equal('DIV');
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

	it('creates an element with attributes', () => {
		const elm = createElm('input', {
			type: 'text',
			name: 'username'
		});

		expect(elm.nodeName).to.equal('INPUT');
		expect(elm.getAttribute('type')).to.equal('text');
		expect(elm.getAttribute('name')).to.equal('username');
	});

	it('creates an element with inline style', () => {
		const elm = createElm('div', null, {
			width: '50px',
			height: '50px'
		});

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.style.width).to.equal('50px');
		expect(elm.style.height).to.equal('50px');
	});
};
