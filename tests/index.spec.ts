import {expect} from 'chai';
import {createElmSpec} from './create.spec';
import {selectElmSpec} from './select/select.spec';
import {bindEventSpec} from './events/events.spec';
import {$, $$, $id, $cls, $tag, createElm, bindEvent, bindEventOnce} from '../src';

globalThis.isBrowser = typeof globalThis.isBrowser === 'undefined'
	? Boolean(globalThis.window)
	: globalThis.isBrowser
;

describe('dom-lib', () => {
	describe('exports', () => {
		it('exports `$`', () => {
			expect($).to.be.a('function');
		});

		it('exports `$$`', () => {
			expect($$).to.be.a('function');
		});

		it('exports `$id`', () => {
			expect($id).to.be.a('function');
		});

		it('exports `$cls`', () => {
			expect($cls).to.be.a('function');
		});

		it('exports `$tag`', () => {
			expect($tag).to.be.a('function');
		});

		it('exports `createElm`', () => {
			expect(createElm).to.be.a('function');
		});

		it('exports `bindEvent`', () => {
			expect(bindEvent).to.be.a('function');
		});

		it('exports `bindEventOnce`', () => {
			expect(bindEventOnce).to.be.a('function');
		});
	});

	// describe('createElm()', createElmSpec);
	describe('selectElm()', selectElmSpec);
	// describe('bindEvent()', bindEventSpec);
});
