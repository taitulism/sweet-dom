const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {firstChild} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('firstChild', () => {
	beforeEach(() => JSDOM.fromFile('./tests/children/children.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(firstChild).to.be.a('function'));

	it('gets element\'s first child - html elements only', () => {
		const elm = document.getElementById('parent');
		expect(firstChild(elm).textContent).to.equal('A');
	});

	it('gets element\'s first child - with nodes (text, comments etc.)', () => {
		const elm = document.getElementById('parent');
		expect(firstChild(elm, true).textContent).to.contain('\n\t\t');
	});

	it('returns `null` when element has no children', () => {
		const elm = document.getElementById('empty');
		expect(firstChild(elm, false)).to.be.null;
	});
});
