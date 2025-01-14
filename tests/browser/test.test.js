/* eslint-disable no-undef */
// import { expect } from 'chai';
// import eq from '../../../jsx/js/eq';
// import Style from '../../../utils/Style';
// const e = require('./node_modules/chai');
// const assert = require('assert');
// import assert from 'assert';
const { expect } = chai;

describe('test', () => {
    it('test true', () => {
        const id1 = 1;
        const id2 = 1;

        const value = true;
        const should = true;
        expect(value).to.equal(should);
    });
});
