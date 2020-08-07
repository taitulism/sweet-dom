const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {getChild} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('getChild', () => {
	let parent;
	beforeEach(() => JSDOM.fromFile('./tests/children/children.html').then((dom) => {
		setWinDoc(dom);
		parent = document.getElementById('parent');
	}));

	afterEach(() => {
		global.window.close();
		parent = null;
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(getChild).to.be.a('function'));

	it('gets element\'s child by index', () => {
		expect(getChild(parent, 1).textContent).to.equal('B');
	});

	it('gets element\'s child by index - with text nodes', () => {
		expect(getChild(parent, 1, true).textContent).to.equal('A');
		expect(getChild(parent, 2, true).textContent).to.contain('some text');
	});

	it('gets element\'s child by a negative index', () => {
		expect(getChild(parent, -1).textContent).to.equal('D');
	});

	it('gets element\'s child by a negative index - with text nodes', () => {
		expect(getChild(parent, -2, true).textContent).to.equal('D');
		expect(getChild(parent, -4, true).textContent).to.contain('a comment');
	});

	it('returns `null` when `index` is out of children count range', () => {
		expect(getChild(parent, -20, false)).to.be.null;
		expect(getChild(parent, 20, false)).to.be.null;
	});

	it('returns `null` when `index` is out of children count range - with text nodes', () => {
		expect(getChild(parent, -20, true)).to.be.null;
		expect(getChild(parent, 20, true)).to.be.null;
	});
});
