const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {put} = require('../..');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

describe('put', () => {
	let elm, childA, childB;

	beforeEach(() => JSDOM.fromFile('./tests/put/put.html').then((dom) => {
		setWinDoc(dom);
		elm = document.createElement('div');
		elm.id = 'put-me';

		childA = document.getElementById('child-A');
		childB = document.getElementById('child-B');
	}));

	afterEach(() => {
		global.window.close();
		global.window = null;
		global.document = null;
		elm = null;
		childA = null;
		childB = null;
	});

	it('is a function', () => expect(put).to.be.a('function'));

	it('returns a `Put` instance', () => {
		const putElm = put(elm);
		const ctor = Object.getPrototypeOf(putElm).constructor;

		expect(ctor.name).to.equal('Put');
		expect(putElm.before).to.be.a('function');
		expect(putElm.after).to.be.a('function');
		expect(putElm.inside).to.be.a('function');
		expect(putElm.instead).to.be.a('function');
		expect(putElm.away).to.be.a('function');
	});

	it('.before', () => {
		expect(childA.nextElementSibling.id).to.equal('child-B');
		put(elm).before(childB);
		expect(childA.nextElementSibling.id).to.equal('put-me');
	});

	it('.after', () => {
		expect(childA.nextElementSibling.id).to.equal('child-B');
		put(elm).after(childA);
		expect(childA.nextElementSibling.id).to.equal('put-me');

		expect(elm.nextElementSibling.id).to.equal('child-B');
	});

	it('.after - with text nodes', () => {
		expect(childA.nextSibling.textContent).to.contain('\n\t\t');
		put(elm).after(childA, true);
		expect(childA.nextSibling.id).to.equal('put-me');

		expect(elm.nextSibling.textContent).to.contain('\n\t\t');
		expect(elm.nextElementSibling.id).to.equal('child-B');
	});

	it('.instead', () => {
		const parentElm = document.getElementById('parent');

		expect(parentElm.children).to.have.lengthOf(3);
		expect(childA.nextElementSibling.id).to.equal('child-B');

		put(elm).instead(childB);

		expect(childA.nextElementSibling.id).to.equal('put-me');
		expect(elm.nextElementSibling.id).to.equal('child-C');
		expect(parentElm.children).to.have.lengthOf(3);
	});

	it('.away', () => {
		expect(childA.nextElementSibling.id).to.equal('child-B');
		put(childB).away(childB);
		expect(childA.nextElementSibling.id).to.equal('child-C');
	});

	describe('.inside', () => {
		let parent;
		beforeEach(() => { parent = document.getElementById('parent'); });
		afterEach(() => { parent = null; });

		it('appends an element in another', () => {
			expect(parent.children).to.have.lengthOf(3);
			put(elm).inside(parent);
			expect(parent.children).to.have.lengthOf(4);
		});

		it('appends last by default', () => {
			const parent = document.getElementById('parent');

			expect(parent.lastElementChild.id).to.equal('child-C');
			put(elm).inside(parent);
			expect(parent.lastElementChild.id).to.equal('put-me');
		});

		it('appends by index', () => {
			const parent = document.getElementById('parent');

			expect(childA.nextElementSibling.id).to.equal('child-B');
			put(elm).inside(parent, 1);
			expect(childA.nextElementSibling.id).to.equal('put-me');
		});

		it('appends by index - with text nodes', () => {
			const parent = document.getElementById('parent');

			expect(parent.childNodes).to.have.lengthOf(7);
			expect(parent.childNodes[3].id).to.equal('child-B');

			put(elm).inside(parent, 3, true);

			expect(parent.childNodes[3].id).to.equal('put-me');
			expect(parent.childNodes).to.have.lengthOf(8);
		});
	});
});
