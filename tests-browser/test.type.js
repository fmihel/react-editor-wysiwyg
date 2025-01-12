/* eslint-disable no-undef */
import gettype from '../jsx/js/gettype.js';
// const gettype = require('../jsx/js/gettype');

// const { expect } = chai;
console.log({ gettype });
describe('gettype', () => {
    it('null', () => {
        const value = gettype(null);
        const should = 'null';
        expect(value).to.equal(should);
    });

    it('undefined', () => {
        const value = gettype(undefined);
        const should = 'undefined';
        expect(value).to.equal(should);
    });

    it('true', () => {
        const value = gettype(true);
        const should = 'boolean';
        expect(value).to.equal(should);
    });

    it('0', () => {
        const value = gettype(0);
        const should = 'number';
        expect(value).to.equal(should);
    });

    it('string', () => {
        const value = gettype('qwefqewjgh');
        const should = 'string';
        expect(value).to.equal(should);
    });

    it('empty string', () => {
        const value = gettype('');
        const should = 'string';
        expect(value).to.equal(should);
    });

    it('object', () => {
        const value = gettype({});
        const should = 'object';
        expect(value).to.equal(should);
    });
    it('array', () => {
        const value = gettype([1, 3, 54]);
        const should = 'array';
        expect(value).to.equal(should);
    });
});
