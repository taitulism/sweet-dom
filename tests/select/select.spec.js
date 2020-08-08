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

	describe('$', () => {
		it('is a function', () => expect($).to.be.a('function'));

		it('selects with native `querySelector`', () => {
			const elm = $('*[class=box]');
			expect(elm.nodeName).to.equal('DIV');
		});

		it('selects with native `querySelector` - with context', () => {
			const ctx = document.getElementById('side-menu');
			const elm = $('*[class=box]', ctx);

			expect(elm.nodeName).to.equal('SPAN');
		});
	});

	describe('$$', () => {
		it('is a function', () => expect($$).to.be.a('function'));
		it('selects with native `querySelectorAll`', () => {
			const elms = $$('section, [class=box]');

			expect(elms).to.have.lengthOf(4);
			expect(elms[0].nodeName).to.equal('SECTION');
			expect(elms[1].nodeName).to.equal('DIV');
			expect(elms[2].nodeName).to.equal('DIV');
			expect(elms[3].nodeName).to.equal('SPAN');
		});

		it('selects with native `querySelectorAll` - with context', () => {
			const ctx = document.getElementById('side-menu');
			const elms = $$('*[class=box]', ctx);

			expect(elms).to.have.lengthOf(1);
			expect(elms[0].nodeName).to.equal('SPAN');
		});

		it('returns an array', () => {
			const elms = $$('*[class=box]');
			expect(elms).to.be.an('array');
		});
	});

	describe('$.id', () => {
		it('is a function', () => expect($.id).to.be.a('function'));

		it('selects an element by id', () => {
			const elm = $.id('root');
			expect(elm.nodeName).to.equal('MAIN');
		});
	});

	describe('$.cls', () => {
		it('is a function', () => expect($.cls).to.be.a('function'));

		it('$.cls - single classname', () => {
			const elms = $.cls('box');
			expect(elms.length).to.equal(4);
			expect(elms[0].nodeName).to.equal('SECTION');
			expect(elms[1].nodeName).to.equal('DIV');
			expect(elms[2].nodeName).to.equal('DIV');
			expect(elms[3].nodeName).to.equal('SPAN');
		});

		it('$.cls - multiple classnames', () => {
			const elms = $.cls('box special');

			expect(elms.length).to.equal(1);
			expect(elms[0].nodeName).to.equal('SECTION');
		});

		it('$.cls - with context', () => {
			const ctx = $.id('side-menu');
			const elms = $.cls('box', ctx);

			expect(elms.length).to.equal(1);
			expect(elms[0].nodeName).to.equal('SPAN');
		});

		it('returns an array', () => {
			const elms = $.cls('box');
			expect(elms).to.be.an('array');
		});
	});

	describe('$tag', () => {
		it('is a function', () => expect($.tag).to.be.a('function'));

		it('$.tag', () => {
			const elms = $.tag('div');

			expect(elms.length).to.equal(3);
			expect(elms[0].textContent).to.equal('box-b');
			expect(elms[1].textContent).to.equal('box-c');
		});

		it('$.tag - with context', () => {
			const ctx = $.id('side-menu');
			const elms = $.tag('div', ctx);
			expect(elms.length).to.equal(1);
			expect(elms[0].textContent).to.equal('box-f');
		});

		it('returns an array', () => {
			const elms = $.tag('div');
			expect(elms).to.be.an('array');
		});
	});
});
