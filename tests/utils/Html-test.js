/* eslint-disable no-undef */
import chai from 'chai';
import Html from '../../utils/Html';
import eq from '../../jsx/js/eq';

const { expect } = chai;
describe('Html', () => {
    describe('attrsAsString', () => {
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

    describe('tag', () => {
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

    describe('fromData', () => {
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
            const should = 'value';
            expect(result).to.equal(should);
        });

        it('5', () => {
            const result = Html.fromData([
                { type: 'char', value: 'T' },
                { type: 'char', value: 'e' },
                { type: 'char', value: 'x' },
                { type: 'char', value: 't' },
            ]);
            const should = 'Text';
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
            const should = 'Te<br>xt';
            expect(result).to.equal(should);
        });

        it('7', () => {
            const result = Html.fromData([
                { type: 'char', value: 'T' },
                { type: 'char', value: 'e' },
                { type: 'char', value: 'x', style: { color: 'red' } },
                { type: 'char', value: 't', style: { color: 'red' } },
            ]);
            const should = 'Te<span style="color:red">xt</span>';
            expect(result).to.equal(should);
        });

        it('8', () => {
            const result = Html.fromData([
                { type: 'char', value: 'T' },
                { type: 'char', value: 'e' },
                { type: 'char', value: 'x', style: { color: 'red', border: 0 } },
                { type: 'char', value: 't', style: { border: 0, color: 'red' } },
            ]);
            const should = 'Te<span style="color:red;border:0">xt</span>';
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
            const should = 'Te<span style="color:red;border:0">xt</span><span style="border:0;color:red;opacity:0.1">no</span>';
            expect(result).to.equal(should);
        });

        it('10', () => {
            const result = Html.fromData([
                { type: 'char', value: 'T' },
                { type: 'space', value: '&nbsp;' },
                { type: 'space', value: '&nbsp;' },
            ]);
            const should = 'T&nbsp;&nbsp;';
            expect(result).to.equal(should);
        });
    });

    if (typeof window !== 'undefined') {
        describe('toData', () => {
            it('1', () => {
                const result = Html.toData('t');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                // console.log(result);
                expect(true).to.equal(should);
            });

            it('2', () => {
                const result = Html.toData('txt');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'x', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                // console.log(result);
                expect(true).to.equal(should);
            });

            it('3', () => {
                const result = Html.toData('<span>txt</span>');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'x', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                // console.log(result);
                expect(true).to.equal(should);
            });

            it('4', () => {
                // const html = '<span style="color:red">t</span>';
                const result = Html.toData('<span style="color:red">t</span>');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: { color: 'red' }, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                expect(true).to.equal(should);
            });

            it('5', () => {
                const result = Html.toData('<span style="color:red">txt</span>');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: { color: 'red' }, class: '',
                    },
                    {
                        type: 'char', value: 'x', style: { color: 'red' }, class: '',
                    },
                    {
                        type: 'char', value: 't', style: { color: 'red' }, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                expect(true).to.equal(should);
            });

            it('6', () => {
                const result = Html.toData('<span style="color:red;border-left:0px">txt</span>');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: { color: 'red', borderLeft: '0px' }, class: '',
                    },
                    {
                        type: 'char', value: 'x', style: { color: 'red', borderLeft: '0px' }, class: '',
                    },
                    {
                        type: 'char', value: 't', style: { color: 'red', borderLeft: '0px' }, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                expect(true).to.equal(should);
            });
            it('7', () => {
                const result = Html.toData('<span>txt</span>ted');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'x', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'e', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'd', style: {}, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                // console.log(result);
                expect(true).to.equal(should);
            });
            it('8', () => {
                const result = Html.toData('    txt        f   ');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'x', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    // { type: 'char', value: ' ', style: {} },
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'f', style: {}, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                expect(true).to.equal(should);
            });

            it('9', () => {
                const result = Html.toData('<span>t a</span>');
                const should = eq.object(result, [
                    {
                        type: 'char', value: 't', style: {}, class: '',
                    },
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 'a', style: {}, class: '',
                    },
                ], { exclude: ['id', 'Com'] });
                expect(true).to.equal(should);
            });

            it('10', () => {
                const result = Html.toData('&nbsp;<span style="color:red">t&nbsp;a</span>&nbsp; &nbsp;');

                const should = eq.object(result, [
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: { color: 'red' }, class: '',
                    },
                    {
                        type: 'space', value: '&nbsp;', style: { color: 'red' }, class: '',
                    },
                    {
                        type: 'char', value: 'a', style: { color: 'red' }, class: '',
                    },
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                ], { exclude: ['id', 'Com'] });

                expect(true).to.equal(should);
            });

            it('11', () => {
                const result = Html.toData('&nbsp;<span>t></span>');

                const should = eq.object(result, [
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: { }, class: '',
                    },
                    {
                        type: 'char', value: '>', style: { }, class: '',
                    },
                ], { exclude: ['id', 'Com'] });

                expect(true).to.equal(should);
            });

            it('12', () => {
                const result = Html.toData('&nbsp;<span>t&lt;</span>>');

                const should = eq.object(result, [
                    {
                        type: 'space', value: '&nbsp;', style: {}, class: '',
                    },
                    {
                        type: 'char', value: 't', style: { }, class: '',
                    },
                    {
                        type: 'char', value: '<', style: { }, class: '',
                    },
                    {
                        type: 'char', value: '>', style: { }, class: '',
                    },
                ], { exclude: ['id', 'Com'] });

                expect(true).to.equal(should);
            });

            it('13', () => {
                const result = Html.toData('<span class="test">A</span>');

                const should = eq.object(result, [
                    {
                        type: 'char', value: 'A', style: { }, class: 'test',
                    },
                ], { exclude: ['id', 'Com'] });

                expect(true).to.equal(should);
            });
        });
    }
});
