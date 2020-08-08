const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {remove} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('remove', () => {
	let parent;
	beforeEach(() => JSDOM.fromFile('./tests/remove/remove.html').then((dom) => {
		setWinDoc(dom);
		parent = document.getElementById('root');
	}));

	afterEach(() => {
		global.window.close();
		parent = null;
		global.window = null;
		global.document = null;
	});

	it('is a function', () => expect(remove).to.be.a('function'));

	it('removes an element from DOM', () => {
		const child = document.getElementById('removee');

		expect(parent.children).to.have.lengthOf(2);
		remove(child);
		expect(parent.children).to.have.lengthOf(1);
	});

	it('removes multiple elements from DOM', () => {
		const elms = document.getElementsByClassName('removable');

		expect(parent.children).to.have.lengthOf(2);
		remove(...elms);
		expect(parent.children).to.have.lengthOf(0);
	});
});
