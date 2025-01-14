/* eslint-disable no-undef */
import chai from 'chai';
import eq from '../../../jsx/js/eq';
import Style from '../../../utils/Style';

const { expect } = chai;
describe('eq', () => {
    describe('eq.id', () => {
        it('eq.id(1,1)', () => {
            const id1 = 1;
            const id2 = 1;

            const value = eq.id(id1, id2);
            const should = true;
            expect(value).to.equal(should);
        });
    });

    describe('eq.is_simple_type', () => {
        it('string', () => {
            const value = eq.is_simple_type('qewjhfdqjew');
            const should = true;
            expect(value).to.equal(should);
        });

        it('0', () => {
            const value = eq.is_simple_type(0);
            const should = true;
            expect(value).to.equal(should);
        });

        it('false', () => {
            const value = eq.is_simple_type(false);
            const should = true;
            expect(value).to.equal(should);
        });

        it('null', () => {
            const value = eq.is_simple_type(null);
            const should = true;
            expect(value).to.equal(should);
        });

        it('undefined', () => {
            const value = eq.is_simple_type(undefined);
            const should = true;
            expect(value).to.equal(should);
        });

        it('object', () => {
            const value = eq.is_simple_type({});
            const should = false;
            expect(value).to.equal(should);
        });

        it('array', () => {
            const value = eq.is_simple_type([]);
            const should = false;
            expect(value).to.equal(should);
        });
    });

    describe('eq.simple', () => {
        it('eq.simple(1,1)', () => {
            const value = eq.simple(1, 1);
            const should = true;
            expect(value).to.equal(should);
        });
    });

    describe('eq.object', () => {
        it('eq.object(1,1)', () => {
            const value = eq.object(1, 1);
            const should = false;
            expect(value).to.equal(should);
        });

        it('eq.object({},{})', () => {
            const value = eq.object({}, {});
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object({ a: 1 }, {})', () => {
            const value = eq.object({ a: 1 }, {});
            const should = false;
            expect(value).to.equal(should);
        });
        it('eq.object({ a: 1, b: 10 }, { b: 10, a: 1 })', () => {
            const value = eq.object({ a: 1, b: 10 }, { b: 10, a: 1 });
            const should = true;
            expect(value).to.equal(should);
        });
        it('eq.object({ a: 1, b: 10,c:13 }, { b: 10, a: 1 })', () => {
            const value = eq.object({ a: 1, b: 10, c: 13 }, { b: 10, a: 1 });
            const should = false;
            expect(value).to.equal(should);
        });
        it('eq.object([1,4,5],[1,4,5])', () => {
            const value = eq.object([1, 4, 5], [1, 4, 5]);
            const should = true;
            expect(value).to.equal(should);
        });
        it('eq.object({ a: [1,4,5], b: 10 }, { b: 10, a: [1,4,5] })', () => {
            const value = eq.object({ a: [1, 4, 5], b: 10 }, { b: 10, a: [1, 4, 5] });
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object({ a: [1,4,[1,5]], b: 10 }, { b: 10, a: [1,4,[1,5]] })', () => {
            const value = eq.object({ a: [1, 4, [1, 5]], b: 10 }, { b: 10, a: [1, 4, [1, 5]] });
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object({ a: [1,4,[1,6]], b: 10 }, { b: 10, a: [1,4,[1,5]] })', () => {
            const value = eq.object({ a: [1, 4, [1, 6]], b: 10 }, { b: 10, a: [1, 4, [1, 5]] });
            const should = false;
            expect(value).to.equal(should);
        });

        it('eq.object(....)', () => {
            const value = eq.object({ id: 1, style: { color: 'red' } }, { id: 2, style: { color: 'red' } });
            const should = false;
            expect(value).to.equal(should);
        });
        it('eq.object(....)', () => {
            const value = eq.object({ id: 1, style: { color: 'red' } }, { id: 2, style: { color: 'red' } }, { exclude: ['id'] });
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object(....)', () => {
            const value = eq.object({ id: 1, style: { color: 'red' } }, { id: 2, style: { color: 'gree' } }, { include: ['style'] });
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object(....)', () => {
            const value = eq.object({ id: 1, style: { color: 'red' } }, { id: 2, style: { color: 'gree' } }, { include: ['style', 'color'] });
            const should = false;
            expect(value).to.equal(should);
        });

        it('eq.object(....)', () => {
            const value = eq.object(
                { id: 1, style: { color: '' } },
                { id: 2, style: { } },
                {
                    exclude: ['id'],
                    custom: {
                        style: (o1, o2) => true,
                    },
                },
            );
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object(....)', () => {
            const value = eq.object(
                { id: 1, style: { color: '' } },
                { id: 2, style: { } },
                {
                    exclude: ['id'],
                    custom: {
                        style: (o1, o2) => Style.eq(o1, o2),
                    },
                },
            );
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object(...)', () => {
            const value = eq.object(
                { id: 1, style: { color: '' } },
                { id: 2, style: { border: '' } },
                {
                    custom: {
                        id: () => true,
                        style: (o1, o2) => Style.eq(o1, o2),
                    },
                },
            );
            const should = true;
            expect(value).to.equal(should);
        });

        it('eq.object(...)', () => {
            const value = eq.object(
                { id: 1, value: 'A', style: { color: '' } },
                { id: 2, value: 'B', style: { border: '' } },
                {
                    exclude: ['id', 'value'],
                    custom: {
                        style: (o1, o2) => Style.eq(o1, o2),
                    },
                },
            );
            const should = true;
            expect(value).to.equal(should);
        });
    });
});
