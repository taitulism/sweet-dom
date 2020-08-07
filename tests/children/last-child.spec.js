const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {lastChild} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('lastChild', () => {
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

	it('is a function', () => expect(lastChild).to.be.a('function'));

	it('gets element\'s last child - html elements only', () => {
		expect(lastChild(parent).textContent).to.equal('D');
	});

	it('gets element\'s last child - with nodes (text, comments etc.)', () => {
		expect(lastChild(parent, true).textContent).to.contain('\n\t\t');
	});

	it('returns `null` when element has no children', () => {
		const emptyElm = document.getElementById('empty');
		expect(lastChild(emptyElm, true)).to.be.null;
	});

	it('sets the last child of an element', () => {
		const newElm = document.createElement('div');
		newElm.id = 'new-elm';

		const lastBefore = parent.children.length - 1;
		expect(parent.children).to.have.lengthOf(4);
		expect(parent.children[lastBefore].textContent).to.equal('D');

		lastChild(parent, newElm);

		const lastAfter = parent.children.length - 1;
		expect(parent.children[lastAfter].id).to.equal('new-elm');
		expect(parent.children).to.have.lengthOf(5);
	});

	it('sets the last child of an element - with text nodes', () => {
		const newElm = document.createElement('div');
		newElm.id = 'new-elm';

		const lastBefore = parent.childNodes.length - 1;
		expect(parent.childNodes).to.have.lengthOf(11);
		expect(parent.childNodes[lastBefore].textContent).to.contain('\n\t\t');

		lastChild(parent, newElm, true);

		const lastAfter = parent.childNodes.length - 1;
		expect(parent.childNodes[lastAfter].id).to.equal('new-elm');
		expect(parent.childNodes).to.have.lengthOf(12);
	});
});
