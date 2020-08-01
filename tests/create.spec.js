const {expect} = require('chai');

const {create} = require('../');

describe('create', () => {
	it('is ok', () => {
		expect(create).to.be.ok;
	});
});
