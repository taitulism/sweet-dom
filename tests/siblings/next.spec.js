const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {next} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('next', () => {
	beforeEach(() => JSDOM.fromFile('./tests/siblings/siblings.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(next).to.be.a('function'));

	it('gets an element\'s next sibling', () => {
		const elm = document.getElementById('child-A');
		expect(next(elm).id).to.equal('child-B');
	});

	it('gets an element\'s next sibling - with text nodes', () => {
		const elm = document.getElementById('child-A');
		expect(next(elm, true).textContent).to.contain('some text');
	});

	it('gets one of an element\'s next siblings', () => {
		const elm = document.getElementById('child-A');
		expect(next(elm, 1).id).to.equal('child-B');
		expect(next(elm, 2).id).to.equal('child-C');
	});

	it('gets one of an element\'s next siblings - with text nodes', () => {
		const elm = document.getElementById('child-A');
		expect(next(elm, 1, true).textContent).to.contain('some text');
		expect(next(elm, 2, true).id).to.equal('child-B');
	});

	it('returns `null` when element is last sibling', () => {
		const elm = document.getElementById('child-D');
		expect(next(elm)).to.be.null;
		expect(next(elm, 20)).to.be.null;
	});
});
