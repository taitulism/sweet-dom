const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {remove} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('remove', () => {
	beforeEach(() => JSDOM.fromFile('./tests/remove/remove.html').then((dom) => {
		setWinDoc(dom);
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(remove).to.be.a('function'));

	it('remove an element from DOM', () => {
		const parent = document.getElementById('root');
		const child = document.getElementById('removee');

		expect(parent.innerHTML).to.contain('here');
		remove(child);
		expect(parent.innerHTML).to.not.contain('here');
	});
});
