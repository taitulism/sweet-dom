const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {create} = require('../');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('create', () => {
	before(() => {
		const dom = new JSDOM('');
		setWinDoc(dom);
	});

	after(() => {
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(create).to.be.a('function'));

	it('creates a `div` by default', () => {
		const elm = create();
		return expect(elm.nodeName).to.equal('DIV');
	});

	it('creates HTML elements', () => {
		expect(create('a').nodeName).to.equal('A');
		expect(create('p').nodeName).to.equal('P');
		expect(create('span').nodeName).to.equal('SPAN');
	});

	it('creates an element with an id', () => {
		const elm = create('h1#the-elm');
		expect(elm.nodeName).to.equal('H1');
		expect(elm.id).to.equal('the-elm');
	});

	it('creates an element with a classname', () => {
		const elm = create('h1.first-class');
		expect(elm.nodeName).to.equal('H1');
		expect(elm.classList.contains('first-class')).to.be.true;
	});

	it('creates an element with multiple classnames', () => {
		const elm = create('p.first-class.second-class');
		expect(elm.nodeName).to.equal('P');
		expect(elm.classList.contains('first-class')).to.be.true;
		expect(elm.classList.contains('second-class')).to.be.true;
	});

	it('creates an element with an id and classnames', () => {
		const elm = create('a#the-link.first-class.second-class');
		expect(elm.nodeName).to.equal('A');
		expect(elm.id).to.equal('the-link');
		expect(elm.classList.contains('first-class')).to.be.true;
		expect(elm.classList.contains('second-class')).to.be.true;
	});

	it('creates an element with attributes', () => {
		const elm = create('input', {
			type: 'text',
			name: 'username'
		});

		expect(elm.nodeName).to.equal('INPUT');
		expect(elm.getAttribute('type')).to.equal('text');
		expect(elm.getAttribute('name')).to.equal('username');
	});

	it('creates an element with inline style', () => {
		const elm = create('div', null, {
			width: '50px',
			height: '50px'
		});

		expect(elm.nodeName).to.equal('DIV');
		expect(elm.style.width).to.equal('50px');
		expect(elm.style.height).to.equal('50px');
	});
});
