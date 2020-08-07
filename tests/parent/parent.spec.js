const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {parent} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('parent', () => {
	beforeEach(() => JSDOM.fromFile('./tests/parent/parent.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(parent).to.be.a('function'));

	it('gets an element\'s direct parent', () => {
		const child = document.getElementById('child');
		const parentElm = parent(child);

		expect(parentElm.id).to.equal('parent');
	});

	it('gets one of element\'s grand parents', () => {
		const child = document.getElementById('child');
		const directParent = parent(child, 1);
		const grandParent = parent(child, 2);

		expect(directParent.id).to.equal('parent');
		expect(grandParent.id).to.equal('grand-parent');
	});

	it('returns null when element has no parents', () => {
		const child = document.getElementById('child');
		expect(parent(child, 20)).to.be.null;
	});
});
