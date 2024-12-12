/* eslint-disable no-undef */
import { expect } from 'chai';
import Parsing from '../../../jsx/js/Parsing';

describe('Parsing.html', () => {
    it('text', () => {
        const str = 'text';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'text' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span>text</span>', () => {
        const str = '<span>text</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'text' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('left<span>text</span>right', () => {
        const str = 'left<span>text</span>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'left' },
            { name: 'span', value: 'text' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });
    it('<span name="mean" >text</span>right', () => {
        const str = '<span src="text">text</span>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'text', attrs: { src: 'text' } },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<br>text', () => {
        const str = '<br>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'br' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<br>text', () => {
        const str = '<br>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'br' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<br/>text', () => {
        const str = '<br>right';
        const result = Parsing.html(str);
        const should = [
            { name: 'br' },
            { name: 'span', value: 'right' },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span>firts<span><img src="http://url.tu"/>', () => {
        const str = '<span>firts</span><img src="http://url.tu"/>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'firts' },
            { name: 'img', attrs: { src: 'http://url.tu' } },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span style="color:red">firts<span>', () => {
        const str = '<span style="color:red">firts</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'firts', attrs: { style: { color: 'red' } } },
        ];
        expect(result).to.deep.equal(should);
    });

    it('<span style="color:red;background-color:#ff00ff">firts<span>', () => {
        const str = '<span style="color:red;background-color:#ff00ff">firts</span>';
        const result = Parsing.html(str);
        const should = [
            { name: 'span', value: 'firts', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
        ];
        expect(result).to.deep.equal(should);
    });
});
