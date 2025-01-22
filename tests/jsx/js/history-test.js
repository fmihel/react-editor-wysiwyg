/* eslint-disable no-undef */
import chai from 'chai';
import ahistory from '../../../jsx/js/history';

const { expect } = chai;
describe('history', () => {
    describe('add', () => {
        it('1', () => {
            const max = 100;
            const history = [1, 2, 3, 4];
            const add = 'a';
            const value = ahistory.add(add, history, max);
            const should = ['a', 1, 2, 3, 4];

            expect(value).to.deep.equal(should);
        });

        it('2', () => {
            const max = 4;
            const history = [1, 2, 3, 4];
            const add = 'a';
            const value = ahistory.add(add, history, max);
            const should = ['a', 1, 2, 4];

            expect(value).to.deep.equal(should);
        });

        it('3', () => {
            const max = 3;
            const history = [1, 2, 3, 4];
            const add = 'a';
            const value = ahistory.add(add, history, max);
            const should = ['a', 1, 4];

            expect(value).to.deep.equal(should);
        });
        it('4', () => {
            const max = 5;
            const history = [1, 2, 3, 4, 5];
            const add = 'a';
            const value = ahistory.add(add, history, max);
            const should = ['a', 1, 2, 3, 5];

            expect(value).to.deep.equal(should);
        });

        it('5', () => {
            const max = 5;
            const history = [1, 2, 3, 4, 5, 6, 7, 8];
            const add = 'a';
            const value = ahistory.add(add, history, max);
            const should = ['a', 1, 2, 3, 8];

            expect(value).to.deep.equal(should);
        });
    });
});
