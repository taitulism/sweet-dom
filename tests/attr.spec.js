const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {attr} = require('../');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('attr', () => {
	let elm;

	before(() => {
		const dom = new JSDOM('');
		setWinDoc(dom);
	});

	after(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	beforeEach(() => { elm = document.createElement('div'); });
	afterEach(() => { elm = null });

	it('is a function', () => expect(attr).to.be.a('function'));

	it('sets an attribute', function () {
		attr(elm, 'key1', 'value1');

		expect(elm.getAttribute('key1')).to.equal('value1');
	});

	it('sets multiple attributes', function () {
		attr(elm, {
			key2: 'value2',
			key3: 'value3'
		});

		expect(elm.getAttribute('key2')).to.equal('value2');
		expect(elm.getAttribute('key3')).to.equal('value3');
	});

	it('gets an attribute value', function () {
		elm.setAttribute('key1', 'value1');
		const value = attr(elm, 'key1');

		expect(value).to.equal('value1');
	});

	it('removes attributes', function () {
		attr(elm, 'key1', null);

		expect(elm.getAttribute('key1')).to.equal(null);
	});
});
