import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import {put} from '../../src/put';
import {glb, setWinDoc} from '../utils';

export const putElmSpec = () => {
	let elm: HTMLElement;
	let childA: HTMLElement;
	let childB: HTMLElement;
	let childC: HTMLElement;

	beforeEach((done) => {
		if (!glb.isBrowser) {
			JSDOM.fromFile('./tests/put/put.html').then((dom) => {
				setWinDoc(dom);
				elm = document.createElement('div');
				elm.id = 'put-me';
				elm.textContent = 'put';

				childA = document.getElementById('child-A')!;
				childB = document.getElementById('child-B')!;
				childC = document.getElementById('child-C')!;
				done();
			});
		}
	});

	afterEach(() => {
		if (!glb.isBrowser) {
			glb.window.close();
			glb.window = undefined;
			glb.document = undefined;
		}
	});

	it('returns a `Put` instance', () => {
		const putElm = put(elm);
		const ctor = Object.getPrototypeOf(putElm).constructor;

		expect(ctor.name).to.equal('Put');
		expect(putElm.before).to.be.a('function');
		expect(putElm.after).to.be.a('function');
		expect(putElm.inside).to.be.a('function');
		expect(putElm.instead).to.be.a('function');
	});

	it('.before()', () => {
		expect(childA.nextElementSibling!.id).to.equal('child-B');
		put(elm).before(childB);
		expect(childA.nextElementSibling!.id).to.equal('put-me');
		expect(elm.nextElementSibling!.id).to.equal('child-B');
	});

	it('.after()', () => {
		expect(childA.nextSibling!.textContent!.trim()).to.equal('');
		put(elm).after(childA);
		expect(childA.nextSibling!.textContent!.trim()).to.equal('put');
	});

	it('.after() - last child (no nextSibling)', () => {
		expect(childC.nextSibling).to.be.a('null');
		put(elm).after(childC);
		expect(childC.nextSibling).to.deep.equal(elm);
	});

	it('.instead()', () => {
		const parentElm = document.getElementById('parent')!;

		expect(childA.nextElementSibling!.id).to.equal('child-B');

		expect(parentElm.children).to.have.lengthOf(3);
		put(elm).instead(childB);
		expect(parentElm.children).to.have.lengthOf(3);

		expect(childA.nextElementSibling!.id).to.equal('put-me');
		expect(document.getElementById('child-B')).to.be.equal(null);
	});

	describe('.inside()', () => {
		let parent: HTMLElement;

		beforeEach(() => {
			parent = document.getElementById('parent')!;
		});

		it('appends by index', () => {
			expect(parent.children).to.have.lengthOf(3);
			expect(childA.nextElementSibling!.id).to.equal('child-B');

			put(elm).inside(parent, 1);

			expect(childA.nextElementSibling!.id).to.equal('put-me');
			expect(parent.children).to.have.lengthOf(4);
		});

		it('appends last by default', () => {
			expect(parent.lastElementChild!.id).to.equal('child-C');
			put(elm).inside(parent);
			expect(parent.lastElementChild!.id).to.equal('put-me');
		});

		it('appends by index - with text nodes', () => {
			expect(parent.childNodes.length).to.equal(6);
			expect(parent.childNodes[4].textContent).to.equal('\n\t\t\t');

			put(elm).inside(parent, 4, true);

			expect(parent.childNodes[4].textContent).to.equal('put');
			expect(parent.childNodes.length).to.equal(7);
		});
	});
};
