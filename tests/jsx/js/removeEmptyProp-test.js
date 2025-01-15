/* eslint-disable no-undef */
import chai from 'chai';
import removeEmptyProp from '../../../jsx/js/removeEmptyProp';

const { expect } = chai;

describe('removeEmptyProp()', () => {
    it('{a:1,b:""} = {a:1}', () => {
        const value = removeEmptyProp({ a: 1, b: '' });
        const should = { a: 1 };
        expect(value).to.deep.equal(should);
    });
    it('{a:1,b:undefined,c:"    "} = {a:1}', () => {
        const value = removeEmptyProp({ a: 1, b: undefined, c: '    ' });
        const should = { a: 1 };
        expect(value).to.deep.equal(should);
    });
});
