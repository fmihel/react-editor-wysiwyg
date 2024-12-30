/* eslint-disable no-undef */
import { expect } from 'chai';
import regExpResult from '../../../jsx/js/regExpResult';

describe('regExpResult', () => {
    it('1', () => {
        const value = regExpResult('\\w+', 'aaa bbb ccc');
        const should = [
            ['aaa'],
            ['bbb'],
            ['ccc'],
        ];
        expect(value).to.deep.equal(should);
    });

    it('2', () => {
        const value = regExpResult('(\\w+)', 'aaa bbb ccc');
        const should = [
            ['aaa', 'aaa'],
            ['bbb', 'bbb'],
            ['ccc', 'ccc'],
        ];
        expect(value).to.deep.equal(should);
    });
    it('3', () => {
        const value = regExpResult(/\w+/gm, 'aaa bbb ccc', (group) => group[0]);
        const should = [
            'aaa',
            'bbb',
            'ccc',
        ];
        expect(value).to.deep.equal(should);
    });

    //

    it('4', () => {
        const value = regExpResult(
            /([\w\-_]+)\s*=\s*("[\s\w~!@#$%^&*()\-+_={}[\]:;|\\/?.,><|`]+"|[^"\s]*)?/gm,
            'p1="aaa" p2= "bbb" p3 = ccc',
        );
        const should = [
            ['p1="aaa"', 'p1', '"aaa"'],
            ['p2= "bbb"', 'p2', '"bbb"'],
            ['p3 = ccc', 'p3', 'ccc'],
        ];
        expect(value).to.deep.equal(should);
    });

    it('5', () => {
        const value = regExpResult(
            /(\w+)(=(("([^"]*)")|(\w*)))?/gm,
            'p1="v1" p2=v2 p3',
        );
        const should = [
            ['p1="v1"', 'p1', '="v1"', '"v1"', '"v1"', 'v1', undefined],
            ['p2=v2', 'p2', '=v2', 'v2', undefined, undefined, 'v2'],
            ['p3', 'p3', undefined, undefined, undefined, undefined, undefined],
        ];
        expect(value).to.deep.equal(should);
    });
});
