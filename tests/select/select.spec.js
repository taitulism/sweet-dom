const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {select: {$, $$}} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('select / $', () => {
	before(() => JSDOM.fromFile('./tests/select/select.html').then((dom) => {
		setWinDoc(dom);
	}));

	after(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect($).to.be.a('function'));

	it('selects by id', () => {
		const elm = $('#root');
		expect(elm.nodeName).to.equal('MAIN');
	});

	it('selects by classname', () => {
		const elms = $('.box');
		expect(elms.nodeName).to.equal('SECTION');
	});

	it('selects by multiple classnames', () => {
		const elms = $$('.box.special');
		expect(elms.length).to.equal(1);
		expect(elms[0].nodeName).to.equal('SECTION');
	});

	it('selects by tag name', () => {
		const elms = $('div');
		expect(elms.textContent).to.equal('box-b');
	});

	it('returns an Array when multiple selection', () => {
		const elms = $$('.box');
		expect(elms.length).to.equal(3);
		expect(Array.isArray(elms)).to.be.true;
	});

	it('$.id', () => {
		const elm = $.id('root');
		expect(elm.nodeName).to.equal('MAIN');
	});

	it('$.cls - single classname', () => {
		const elms = $.cls('box');
		expect(elms.length).to.equal(3);
		expect(elms[0].nodeName).to.equal('SECTION');
		expect(elms[1].nodeName).to.equal('DIV');
		expect(elms[2].nodeName).to.equal('DIV');
	});

	it('$.cls - multiple classnames', () => {
		const elms = $.cls('box special');
		expect(elms.length).to.equal(1);
		expect(elms[0].nodeName).to.equal('SECTION');
	});

	it('$.tag', () => {
		const elms = $.tag('div');
		expect(elms.length).to.equal(2);
		expect(elms[0].textContent).to.equal('box-b');
		expect(elms[1].textContent).to.equal('box-c');
	});

	it('selects from within a context');
});
