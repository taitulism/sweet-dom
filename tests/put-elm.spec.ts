import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import {put} from '../src/put';
import {glb, setWinDoc} from './utils';

export const putElmSpec = () => {
	let elm: HTMLElement;
	let childA: HTMLElement;
	let childB: HTMLElement;
	let childC: HTMLElement;

	beforeEach((done) => {
		JSDOM.fromFile('./tests/html/put-elm.html').then((dom) => {
			setWinDoc(dom);
			elm = document.createElement('div');
			elm.id = 'put-me';
			elm.textContent = 'put';

			childA = document.getElementById('child-A')!;
			childB = document.getElementById('child-B')!;
			childC = document.getElementById('child-C')!;
			done();
		});
	});

	afterEach(() => {
		glb.window.close();
		glb.window = undefined;
		glb.document = undefined;
	});

	it('returns a `Put` instance', () => {
		const putElm = put(elm);
		const ctor = Object.getPrototypeOf(putElm).constructor;

		expect(ctor.name).to.equal('Put');
		expect(putElm.before).to.be.a('function');
		expect(putElm.after).to.be.a('function');
	});

	it('accepts a fragment', () => {
		const frag = document.createDocumentFragment();

		frag.append(childA, childB);

		expect(childC.nextElementSibling).to.be.a('null');
		put(frag).after(childC);
		expect(childC.nextElementSibling!.id).to.equal('child-A');
		expect(childA.nextElementSibling!.id).to.equal('child-B');
	});

	describe('.before()', () => {
		it('.before(elm)', () => {
			expect(childA.nextElementSibling!.id).to.equal('child-B');
			put(elm).before(childB);
			expect(childA.nextElementSibling!.id).to.equal('put-me');
			expect(elm.nextElementSibling!.id).to.equal('child-B');
		});

		it('.before(selector)', () => {
			expect(childA.nextElementSibling!.id).to.equal('child-B');
			put(elm).before('#child-B');
			expect(childA.nextElementSibling!.id).to.equal('put-me');
			expect(elm.nextElementSibling!.id).to.equal('child-B');
		});
	});

	describe('.after()', () => {
		it('.after(elm)', () => {
			expect(childA.nextSibling!.textContent!.trim()).to.equal('');
			put(elm).after(childA);
			expect(childA.nextSibling!.textContent!.trim()).to.equal('put');
		});

		it('.after(selector)', () => {
			expect(childA.nextSibling!.textContent!.trim()).to.equal('');
			put(elm).after('#child-A');
			expect(childA.nextSibling!.textContent!.trim()).to.equal('put');
		});

		it('.after(elm) - after last child (no nextSibling)', () => {
			expect(childC.nextSibling).to.be.a('null');
			put(elm).after(childC);
			expect(childC.nextSibling).to.deep.equal(elm);
		});
	});
};
