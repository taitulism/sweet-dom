const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {value} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('value', () => {
	beforeEach(() => JSDOM.fromFile('./tests/value/value.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(value).to.be.a('function'));

	it('gets an input element value', () => {
		const input = document.getElementById('test-input');
		const inputValue = value(input);

		expect(inputValue).to.contain('foo bar');
	});

	it('sets value on an input element', () => {
		const input = document.getElementById('test-input');
		value(input, 'baz');
		const inputValue = input.value;

		expect(inputValue).to.equal('baz');
	});
});
