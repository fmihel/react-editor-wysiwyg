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
            /([\w\-_]+)\s*=\s*("[\s\w~!@#$%^&*()\-+_={}\[\]:;|\\\/?.,><|`]+"|[^"\s]*)?/gm,
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
            /[a-zA-Z0-9\-_]+(=(("[a-z0-9=\(\)\[\]\{\}+\-_~:;,\.*&\^\$\#\@/\!\s]*")|[^"'\s])*)?/gm,
            'p1="aaa" p2= "bbb" p3 = ccc',
        );
        console.log(value);
        const should = [
            ['p1="aaa"', 'p1', '"aaa"'],
            ['p2= "bbb"', 'p2', '"bbb"'],
            ['p3 = ccc', 'p3', 'ccc'],
        ];
        expect(value).to.deep.equal(should);
    });
});
