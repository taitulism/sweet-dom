const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {firstChild} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('firstChild', () => {
	let parent;
	beforeEach(() => JSDOM.fromFile('./tests/children/children.html').then((dom) => {
		setWinDoc(dom);
		parent = document.getElementById('parent');
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
		parent = null;
	});

	it('is a function', () => expect(firstChild).to.be.a('function'));

	it('gets element\'s first child - html elements only', () => {
		expect(firstChild(parent).textContent).to.equal('A');
	});

	it('gets element\'s first child - with nodes (text, comments etc.)', () => {
		expect(firstChild(parent, true).textContent).to.contain('\n\t\t');
	});

	it('returns `null` when element has no children', () => {
		const emptyElm = document.getElementById('empty');
		expect(firstChild(emptyElm, false)).to.be.null;
	});

	it('sets the first child of an element', () => {
		const newElm = document.createElement('div');
		newElm.id = 'new-elm';

		expect(parent.children).to.have.lengthOf(4);
		expect(parent.children[0].textContent).to.equal('A');

		firstChild(parent, newElm);

		expect(parent.children[0].id).to.equal('new-elm');
		expect(parent.children).to.have.lengthOf(5);
	});

	it('sets the first child of an element - with text nodes', () => {
		const newElm = document.createElement('div');
		newElm.id = 'new-elm';

		expect(parent.childNodes).to.have.lengthOf(11);
		expect(parent.childNodes[0].textContent).to.contain('\n\t\t');

		firstChild(parent, newElm, true);

		expect(parent.childNodes[0].id).to.equal('new-elm');
		expect(parent.childNodes).to.have.lengthOf(12);
	});
});
