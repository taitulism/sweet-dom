const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {show, hide} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('visibility', () => {
	beforeEach(() => JSDOM.fromFile('./tests/visibility/visibility.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	describe('show', () => {
		it('is a function', () => expect(show).to.be.a('function'));

		it('shows a hidden element', () => {
			const elm = document.getElementById('invisible-wiz');
			show(elm);

			expect(elm.style.display).to.equal('block');
		});

		it('accepts a second argument for `style.display` value (default=`block`)', () => {
			const elm = document.getElementById('invisible-wiz');
			show(elm, 'inline-block');

			expect(elm.style.display).to.equal('inline-block');
		});
	});



	describe('hide', () => {
		it('is a function', () => expect(hide).to.be.a('function'));

		it('hides an element', () => {
			const elm = document.getElementById('visible-wiz');
			hide(elm);

			expect(elm.style.display).to.equal('none');

		});
	});
});
