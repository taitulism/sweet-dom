const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {children} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('children', () => {
	beforeEach(() => JSDOM.fromFile('./tests/children/children.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(children).to.be.a('function'));

	it('gets element\'s children - html elements only', () => {
		const elm = document.getElementById('parent');
		expect(children(elm)).to.have.lengthOf(4);
	});

	it('gets element\'s children - with nodes (text, comments etc.)', () => {
		const elm = document.getElementById('parent');
		// children(elm, true).forEach((child) => console.log(child)); // ◄── see why 11
		expect(children(elm, true)).to.have.lengthOf(11);
	});

	it('returns an array', () => {
		const elm = document.getElementById('parent');
		expect(children(elm, false)).to.be.an('array');
		expect(children(elm, true)).to.be.an('array');
	});
});
