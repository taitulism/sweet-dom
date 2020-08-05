const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {prev} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('prev', () => {
	beforeEach(() => JSDOM.fromFile('./tests/siblings/siblings.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(prev).to.be.a('function'));

	it('gets an element\'s previous sibling - html elements only', () => {
		const elm = document.getElementById('child-D');
		expect(prev(elm).id).to.equal('child-C');
	});

	it('gets an element\'s previous sibling - with nodes (text, comments etc.)', () => {
		const elm = document.getElementById('child-D');
		expect(prev(elm, true).textContent).to.contain('\n\t\t');
	});

	it('gets one of an element\'s previous siblings', () => {
		const elm = document.getElementById('child-D');
		expect(prev(elm, 1).id).to.equal('child-C');
		expect(prev(elm, 2).id).to.equal('child-B');
	});

	it('gets one of an element\'s previous siblings - with nodes', () => {
		const elm = document.getElementById('child-D');
		expect(prev(elm, 1, true).textContent).to.contain('\n\t\t');
		expect(prev(elm, 2, true).textContent).to.contain('a comment');
	});

	it('returns `null` when element is first sibling', () => {
		const elm = document.getElementById('child-A');
		expect(prev(elm, false)).to.be.null;
		expect(prev(elm, 20, false)).to.be.null;
	});
});
