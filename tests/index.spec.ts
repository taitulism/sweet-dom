import {expect} from 'chai';
import {createElmSpec} from './create-elm.spec';
import {elmUtilsSpec} from './elm-utils.spec';
import {createFragSpec} from './create-frag.spec';
import {selectElmSpec} from './select-elm.spec';
import {bindEventSpec} from './bind-events.spec';
import {insertElmSpec} from './insert-elm.spec';
import {
	$, $$,
	setAttributes,
	setStyle,
	createElm,
	createFrag,
	bindEvent,
	bindEventOnce,
	insert,
} from '../src';

describe('sweet-dom', () => {
	describe('exports', () => {
		it('exports `$`', () => {
			expect($).to.be.a('function');
		});

		it('exports `$$`', () => {
			expect($$).to.be.a('function');
		});

		it('exports `createElm`', () => {
			expect(createElm).to.be.a('function');
		});

		it('exports `setAttributes`', () => {
			expect(setAttributes).to.be.a('function');
		});

		it('exports `setStyle`', () => {
			expect(setStyle).to.be.a('function');
		});

		it('exports `createFrag`', () => {
			expect(createFrag).to.be.a('function');
		});

		it('exports `bindEvent`', () => {
			expect(bindEvent).to.be.a('function');
		});

		it('exports `bindEventOnce`', () => {
			expect(bindEventOnce).to.be.a('function');
		});

		it('exports `insert`', () => {
			expect(insert).to.be.a('function');
		});
	});

	describe('element utils', elmUtilsSpec);
	describe('createElm()', createElmSpec);
	describe('createFrag()', createFragSpec);
	describe('element selction', selectElmSpec);
	describe('bindEvent()', bindEventSpec);
	describe('insert()', insertElmSpec);
});
