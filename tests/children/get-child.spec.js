const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {getChild} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('getChild', () => {
	beforeEach(() => JSDOM.fromFile('./tests/children/children.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(getChild).to.be.a('function'));

	it('gets element\'s child by index - html elements only', () => {
		const elm = document.getElementById('parent');
		expect(getChild(elm, 1).textContent).to.equal('B');
	});

	it('gets element\'s child by index - with nodes (text, comments etc.)', () => {
		const elm = document.getElementById('parent');
		expect(getChild(elm, 1, true).textContent).to.equal('A');
		expect(getChild(elm, 2, true).textContent).to.contain('some text');
	});

	it('returns `null` when `index` is out of children count range', () => {
		const elm = document.getElementById('parent');
		expect(getChild(elm, -20, false)).to.be.null;
		expect(getChild(elm, 20, false)).to.be.null;
	});

	it('returns `null` when `index` is out of children count range (with nodes)', () => {
		const elm = document.getElementById('parent');
		expect(getChild(elm, -20, true)).to.be.null;
		expect(getChild(elm, 20, true)).to.be.null;
	});
});
