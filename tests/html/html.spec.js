const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {html} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('html', () => {
	beforeEach(() => JSDOM.fromFile('./tests/html/html.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(html).to.be.a('function'));

	it('gets an element\'s inner html', () => {
		const elm = document.getElementById('root');
		const elmText = html(elm);

		expect(elmText)
			.to.contain('text A')
			.and.to.contain('<div>child text</div>')
			.and.to.contain('<div id="empty"></div>')
			.and.to.contain('text B');
	});

	it('sets html of an element', () => {
		const elm = document.getElementById('empty');
		html(elm, '<span>foo bar</span>');
		const checkHtml = elm.innerHTML;

		expect(checkHtml).to.equal('<span>foo bar</span>');
	});
});
