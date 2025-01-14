/* eslint-disable no-undef */
import chai from 'chai';
import crc32 from '../../../jsx/js/crc32';

const { expect } = chai;

describe('crc32', () => {
    it('compute_string 1', () => {
        const value = crc32.compute_string('test');
        const should = 3632233996;
        expect(value).to.equal(should);
    });
    it('compute_string 2', () => {
        const value = crc32.compute_string_hex('test2');
        // const should = 331058520;
        const should = '13bb8d58';
        expect(value).to.equal(should);
    });
});
