/* eslint-disable no-undef */
import { expect } from 'chai';
import Html from '../../utils/Html';
import eq from '../../jsx/js/eq';

describe('Html.attrsAsString', () => {
    it('{ test: 1 }', () => {
        const attrs = { test: 1 };
        const result = Html.attrsAsString(attrs);
        const should = 'test="1"';
        // const result = true;
        // const should = trsue;
        expect(result).to.equal(should);
    });

    it('{ src:"http://site.ru" }', () => {
        const attrs = { src: 'http://site.ru' };
        const result = Html.attrsAsString(attrs);
        const should = 'src="http://site.ru"';
        // const result = true;
        // const should = trsue;
        expect(result).to.equal(should);
    });

    it('{ src:"http://site.ru",test }', () => {
        const attrs = { src: 'http://site.ru', test: undefined };
        const result = Html.attrsAsString(attrs);
        const should = 'src="http://site.ru" test="undefined"';

        expect(result).to.equal(should);
    });

    it('{ src:"http://site.ru",test:"a" }', () => {
        const attrs = { src: 'http://site.ru', test: 'a' };
        const result = Html.attrsAsString(attrs);
        const should = 'src="http://site.ru" test="a"';

        expect(result).to.equal(should);
    });

    it('{ style:{color:"red"} }', () => {
        const attrs = { style: { color: 'red' } };
        const result = Html.attrsAsString(attrs);
        const should = 'style="color:red"';

        expect(result).to.equal(should);
    });

    it('{ style:{color:"red",backgroundColor:#ff00ff} }', () => {
        const attrs = { style: { color: 'red', backgroundColor: '#ff00ff' } };
        const result = Html.attrsAsString(attrs);
        const should = 'style="color:red;background-color:#ff00ff"';

        expect(result).to.equal(should);
    });

    it('{ style:{color:"red",backgroundColor:"#ff00ff";backgroundImage:url("xxxx")} }', () => {
        const attrs = { style: { color: 'red', backgroundColor: '#00ff00', backgroundImage: 'url(\'xxxx\')' } };
        const result = Html.attrsAsString(attrs);
        const should = 'style="color:red;background-color:#00ff00;background-image:url(\'xxxx\')"';

        expect(result).to.equal(should);
    });
});

describe('Html.tag', () => {
    it('{ name: "br" }', () => {
        const setup = { name: 'br' };
        const result = Html.tag(setup);
        const should = '<br>';
        expect(result).to.equal(should);
    });

    it('{ name: "img" }', () => {
        const setup = { name: 'img' };
        const result = Html.tag(setup);
        const should = '<img/>';
        expect(result).to.equal(should);
    });

    it('{ name: "img" }', () => {
        const setup = { name: 'img', test: '2' };
        const result = Html.tag(setup);
        const should = '<img test="2"/>';
        expect(result).to.equal(should);
    });

    it('{ name: "span" }', () => {
        const setup = { name: 'span', test: '2', value: 'test' };
        const result = Html.tag(setup);
        const should = '<span test="2">test</span>';
        expect(result).to.equal(should);
    });

    it('{ name: "span" }', () => {
        const setup = {
            name: 'span', test: '2', value: 'test', style: { color: 'red' },
        };
        const result = Html.tag(setup);
        const should = '<span test="2" style="color:red">test</span>';
        expect(result).to.equal(should);
    });

    it('{ name: "span" }', () => {
        const setup = {
            name: 'span', test: '2', value: 'test', style: { color: 'red', backgroundColor: '#ff00ff' },
        };
        const result = Html.tag(setup);
        const should = '<span test="2" style="color:red;background-color:#ff00ff">test</span>';
        expect(result).to.equal(should);
    });
});

describe('Html.fromData', () => {
    it('1', () => {
        const result = Html.fromData([
            { type: 'img', src: 'site.ru' },
        ]);
        const should = '<img src="site.ru"/>';
        expect(result).to.equal(should);
    });

    it('2', () => {
        const result = Html.fromData([
            { type: 'br', src: 'site.ru' },
        ]);
        const should = '<br>';
        expect(result).to.equal(should);
    });

    it('3', () => {
        const result = Html.fromData([
            { type: 'br' },
            { type: 'img', src: 'site.ru' },
        ]);
        const should = '<br><img src="site.ru"/>';
        expect(result).to.equal(should);
    });

    it('4', () => {
        const result = Html.fromData([
            { type: 'char', value: 'value' },
        ]);
        const should = '<span>value</span>';
        expect(result).to.equal(should);
    });

    it('5', () => {
        const result = Html.fromData([
            { type: 'char', value: 'T' },
            { type: 'char', value: 'e' },
            { type: 'char', value: 'x' },
            { type: 'char', value: 't' },
        ]);
        const should = '<span>Text</span>';
        expect(result).to.equal(should);
    });

    it('6', () => {
        const result = Html.fromData([
            { type: 'char', value: 'T' },
            { type: 'char', value: 'e' },
            { type: 'br' },
            { type: 'char', value: 'x' },
            { type: 'char', value: 't' },
        ]);
        const should = '<span>Te</span><br><span>xt</span>';
        expect(result).to.equal(should);
    });

    it('7', () => {
        const result = Html.fromData([
            { type: 'char', value: 'T' },
            { type: 'char', value: 'e' },
            { type: 'char', value: 'x', style: { color: 'red' } },
            { type: 'char', value: 't', style: { color: 'red' } },
        ]);
        const should = '<span>Te</span><span style="color:red">xt</span>';
        expect(result).to.equal(should);
    });

    it('8', () => {
        const result = Html.fromData([
            { type: 'char', value: 'T' },
            { type: 'char', value: 'e' },
            { type: 'char', value: 'x', style: { color: 'red', border: 0 } },
            { type: 'char', value: 't', style: { border: 0, color: 'red' } },
        ]);
        const should = '<span>Te</span><span style="color:red;border:0">xt</span>';
        expect(result).to.equal(should);
    });

    it('9', () => {
        const result = Html.fromData([
            { type: 'char', value: 'T' },
            { type: 'char', value: 'e' },
            { type: 'char', value: 'x', style: { color: 'red', border: 0 } },
            { type: 'char', value: 't', style: { border: 0, color: 'red' } },
            { type: 'char', value: 'n', style: { border: 0, color: 'red', opacity: 0.1 } },
            { type: 'char', value: 'o', style: { border: 0, color: 'red', opacity: 0.1 } },
        ]);
        const should = '<span>Te</span><span style="color:red;border:0">xt</span><span style="border:0;color:red;opacity:0.1">no</span>';
        expect(result).to.equal(should);
    });

    it('10', () => {
        const result = Html.fromData([
            { type: 'char', value: 'T' },
            { type: 'space', value: '&nbsp;' },
            { type: 'space', value: '&nbsp;' },
        ]);
        const should = '<span>T</span><span>&nbsp;&nbsp;</span>';
        expect(result).to.equal(should);
    });
});

describe('Html.toData', () => {
    it('1', () => {
        const result = Html.toData('t');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: {} },
        ], { exclude: ['id', 'Com'] });
        // console.log(result);
        expect(true).to.equal(should);
    });

    it('2', () => {
        const result = Html.toData('txt');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: {} },
            { type: 'char', value: 'x', style: {} },
            { type: 'char', value: 't', style: {} },
        ], { exclude: ['id', 'Com'] });
        // console.log(result);
        expect(true).to.equal(should);
    });

    it('3', () => {
        const result = Html.toData('<span>txt</span>');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: {} },
            { type: 'char', value: 'x', style: {} },
            { type: 'char', value: 't', style: {} },
        ], { exclude: ['id', 'Com'] });
        // console.log(result);
        expect(true).to.equal(should);
    });

    it('4', () => {
        // const html = '<span style="color:red">t</span>';
        const result = Html.toData('<span style="color:red">t</span>');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: { color: 'red' } },
        ], { exclude: ['id', 'Com'] });
        expect(true).to.equal(should);
    });

    it('5', () => {
        const result = Html.toData('<span style="color:red">txt</span>');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: { color: 'red' } },
            { type: 'char', value: 'x', style: { color: 'red' } },
            { type: 'char', value: 't', style: { color: 'red' } },
        ], { exclude: ['id', 'Com'] });
        expect(true).to.equal(should);
    });

    it('6', () => {
        const result = Html.toData('<span style="color:red;border-left:0px">txt</span>');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: { color: 'red', borderLeft: '0px' } },
            { type: 'char', value: 'x', style: { color: 'red', borderLeft: '0px' } },
            { type: 'char', value: 't', style: { color: 'red', borderLeft: '0px' } },
        ], { exclude: ['id', 'Com'] });
        expect(true).to.equal(should);
    });
    it('7', () => {
        const result = Html.toData('<span>txt</span>ted');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: {} },
            { type: 'char', value: 'x', style: {} },
            { type: 'char', value: 't', style: {} },
            { type: 'char', value: 't', style: {} },
            { type: 'char', value: 'e', style: {} },
            { type: 'char', value: 'd', style: {} },
        ], { exclude: ['id', 'Com'] });
        // console.log(result);
        expect(true).to.equal(should);
    });
    it('8', () => {
        const result = Html.toData('    txt        f   ');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: {} },
            { type: 'char', value: 'x', style: {} },
            { type: 'char', value: 't', style: {} },
            // { type: 'char', value: ' ', style: {} },
            { type: 'space', value: '&nbsp;', style: {} },
            { type: 'char', value: 'f', style: {} },
        ], { exclude: ['id', 'Com'] });
        expect(true).to.equal(should);
    });

    it('9', () => {
        const result = Html.toData('<span>t a</span>');
        const should = eq.object(result, [
            { type: 'char', value: 't', style: {} },
            { type: 'space', value: '&nbsp;', style: {} },
            { type: 'char', value: 'a', style: {} },
        ], { exclude: ['id', 'Com'] });
        expect(true).to.equal(should);
    });

    it('10', () => {
        const result = Html.toData('&nbsp;<span style="color:red">t&nbsp;a</span>&nbsp; &nbsp;');

        const should = eq.object(result, [
            { type: 'space', value: '&nbsp;', style: {} },
            { type: 'char', value: 't', style: { color: 'red' } },
            { type: 'space', value: '&nbsp;', style: { color: 'red' } },
            { type: 'char', value: 'a', style: { color: 'red' } },
            { type: 'space', value: '&nbsp;', style: {} },
            { type: 'space', value: '&nbsp;', style: {} },
            { type: 'space', value: '&nbsp;', style: {} },
        ], { exclude: ['id', 'Com'] });

        expect(true).to.equal(should);
    });
});
