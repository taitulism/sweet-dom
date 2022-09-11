import {expect} from 'chai';
import {createElmSpec} from './create.spec';
import {selectElmSpec} from './select/select.spec';
import {bindEventSpec} from './events/events.spec';
import {$, createElm, bindEvent, bindEventOnce} from '../src';

globalThis.isBrowser = Boolean(globalThis.window);

describe('dom-lib', () => {
	describe('exports', () => {
		it('exports `$`', () => {
			expect($).to.be.a('function');
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

	describe('createElm()', createElmSpec);
	// describe('selectElm()', selectElmSpec);
	// describe('bindEvent()', bindEventSpec);
});
