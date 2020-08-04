const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {style} = require('..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('style', () => {
	let elm;
	beforeEach(() => { elm = document.createElement('div'); });
	afterEach(() => { elm = null });

	before(() => {
		const dom = new JSDOM('');
		setWinDoc(dom);
	});

	after(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(style).to.be.a('function'));

	it('gets inline style', function () {
		elm.style.width = '50px';

		const value = style(elm, 'width');

		expect(value).to.equal('50px');
	});

	it('sets inline style', function () {
		style(elm, 'width', '50px');

		expect(elm.style.width).to.equal('50px');
	});

	it('sets multiple inline styles', function () {
		style(elm, {
			width: '50px',
			height: '30px'
		});

		expect(elm.style.width).to.equal('50px');
		expect(elm.style.height).to.equal('30px');
	});
});
