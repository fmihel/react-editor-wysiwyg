/* eslint-disable no-undef */
import chai from 'chai';
import Style from '../../utils/Style';

const { expect } = chai;

describe('Style.isNotEmptyProp', () => {
    describe('Style.isNotEmptyProp', () => {
        it('empty', () => {
            const result = Style.isNotEmptyProp('');
            const should = false;
            expect(result).to.equal(should);
        });

        it('undefined', () => {
            const result = Style.isNotEmptyProp(undefined);
            const should = false;
            expect(result).to.equal(should);
        });

        it('#ff00ff', () => {
            const result = Style.isNotEmptyProp('#ff00ff');
            const should = true;
            expect(result).to.equal(should);
        });
    });

    describe('Style.eq', () => {
        it('{} {}', () => {
            const result = Style.eq({}, {});
            const should = true;
            expect(result).to.equal(should);
        });

        it('{border:""} {}', () => {
            const result = Style.eq({ border: '' }, {});
            const should = true;
            expect(result).to.equal(should);
        });

        it('{border:""} {color:""}', () => {
            const result = Style.eq({ border: '' }, { color: '' });
            const should = true;
            expect(result).to.equal(should);
        });

        it('{border:"red"} {color:""}', () => {
            const result = Style.eq({ border: 'red' }, { color: '' });
            const should = false;
            expect(result).to.equal(should);
        });

        it('{border:"red"} {color:"",border:"red"}', () => {
            const result = Style.eq({ border: 'red' }, { color: '', border: 'red' });
            const should = true;
            expect(result).to.equal(should);
        });
    });
});
