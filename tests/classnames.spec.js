const {expect} = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {hasClass, addClass, removeClass, toggleClass, replaceClass} = require('../');

const setWinDoc = (dom) => {
	global.window = dom.window;
	global.document = dom.window.document;
};

const NEW_CLASSNAME = 'new-classname';
const EXISTING_CLASSNAME_1 = 'existing-classname-1';
const EXISTING_CLASSNAME_2 = 'existing-classname-2';
const EXISTING_CLASSNAME_3 = 'existing-classname-3';

describe('classnames', () => {
	let elm;
	beforeEach(() => {
		elm = document.createElement('div');
		elm.classList.add('existing-classname-1');
		elm.classList.add('existing-classname-2');
		elm.classList.add('existing-classname-3');
	});
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

	describe('hasClass', () => {
		it('is a function', () => expect(hasClass).to.be.a('function'));

		it('returns `true` if element has a classname', () => {
			const has = hasClass(elm, EXISTING_CLASSNAME_1);
			expect(has).to.be.true;
		});

		it('returns `false` if element doesn\'t have a classname', () => {
			const has = hasClass(elm, NEW_CLASSNAME);
			expect(has).to.be.false;
		});
	});

	describe('addClass', () => {
		it('is a function', () => expect(addClass).to.be.a('function'));

		it('adds a classname to an element', () => {
			const hasBefore = hasClass(elm, NEW_CLASSNAME);
			addClass(elm, NEW_CLASSNAME);
			const hasAfter = hasClass(elm, NEW_CLASSNAME);

			expect(hasBefore).to.be.false;
			expect(hasAfter).to.be.true;
		});
	});

	describe('removeClass', () => {
		it('is a function', () => expect(removeClass).to.be.a('function'));

		it('removes a classname to an element', () => {
			const hasBefore = hasClass(elm, EXISTING_CLASSNAME_1);
			removeClass(elm, EXISTING_CLASSNAME_1);
			const hasAfter = hasClass(elm, EXISTING_CLASSNAME_1);

			expect(hasBefore).to.be.true;
			expect(hasAfter).to.be.false;
		});
	});

	describe('toggleClass', () => {
		it('is a function', () => expect(toggleClass).to.be.a('function'));

		it('toggles a classname on an element', () => {
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.false;
			toggleClass(elm, NEW_CLASSNAME);
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.true;
			toggleClass(elm, NEW_CLASSNAME);
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.false;
		});

		it('set a classname based on a boolean', () => {
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.false;
			toggleClass(elm, NEW_CLASSNAME, true);
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.true;
			toggleClass(elm, NEW_CLASSNAME, true);
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.true;
			toggleClass(elm, NEW_CLASSNAME, false);
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.false;
		});
	});

	describe('replaceClass', () => {
		it('is a function', () => expect(replaceClass).to.be.a('function'));

		it('replaces a classname with another (rename)', () => {
			expect(elm.classList.contains(EXISTING_CLASSNAME_2)).to.be.true;
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.false;

			replaceClass(elm, EXISTING_CLASSNAME_2, NEW_CLASSNAME);

			expect(elm.classList.contains(EXISTING_CLASSNAME_2)).to.be.false;
			expect(elm.classList.contains(NEW_CLASSNAME)).to.be.true;
		});
	});
});
