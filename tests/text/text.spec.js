const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {text} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('text', () => {
	beforeEach(() => JSDOM.fromFile('./tests/text/text.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(text).to.be.a('function'));

	it('gets an element text', () => {
		const elm = document.getElementById('root');
		const elmText = text(elm);

		expect(elmText)
			.to.contain('text A')
			.and.to.contain('child text')
			.and.to.contain('text B')
			.and.not.to.contain('<div>child text</div>')
			.and.not.to.contain('<div id="empty"></div>');
	});

	it('sets text in an element', () => {
		const elm = document.getElementById('empty');
		text(elm, '<span>foo bar</span>');
		const checkText = elm.textContent;

		expect(checkText).to.equal('<span>foo bar</span>');
	});

	// jsdom doesn't suppot "innerText"
	it.skip('gets only direct text of an element', () => {
		const elm = document.getElementById('root');
		const elmText = text(elm, true);

		expect(elmText).to.contain('text A')
			.and.to.contain('text B')
			.and.not.to.contain('child text');
	});
});
