const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {lastChild} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('lastChild', () => {
	beforeEach(() => JSDOM.fromFile('./tests/children/children.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(lastChild).to.be.a('function'));

	it('gets element\'s last child - html elements only', () => {
		const elm = document.getElementById('parent');
		expect(lastChild(elm).textContent).to.equal('D');
	});

	it('gets element\'s last child - with nodes (text, comments etc.)', () => {
		const elm = document.getElementById('parent');
		expect(lastChild(elm, true).textContent).to.contain('\n\t\t');
	});

	it('returns `null` when element has no children', () => {
		const elm = document.getElementById('empty');
		expect(lastChild(elm, true)).to.be.null;
	});
});
