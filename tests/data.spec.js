const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {data} = require('..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('data', () => {
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

	it('is a function', () => expect(data).to.be.a('function'));

	it('sets an data attribute', function () {
		data(elm, 'key1', 'value1');

		expect(elm.dataset.key1).to.equal('value1');
	});

	it('sets multiple data attributes', function () {
		data(elm, {
			key2: 'value2',
			key3: 'value3'
		});

		expect(elm.dataset.key2).to.equal('value2');
		expect(elm.dataset.key3).to.equal('value3');
	});

	it('gets an data attribute value', function () {
		elm.dataset.key1 = 'value1';
		const value = data(elm, 'key1');

		expect(value).to.equal('value1');
	});

	it('removes data attributes', function () {
		data(elm, 'key1', null);

		expect(elm.dataset.key1).to.be.undefined;
	});
});
