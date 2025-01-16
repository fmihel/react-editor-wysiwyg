/* eslint-disable no-undef */
import chai from 'chai';
import Parsing from '../../../jsx/js/Parsing';

const { expect } = chai;

describe('Parsing', () => {
    if (typeof window !== 'undefined') {
        describe('html_v2', () => {
            it('text', () => {
                const str = 'text';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'text' },
                ];
                expect(result).to.deep.equal(should);
            });

            it('<span>text</span>', () => {
                const str = '<span>text</span>';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'text' },
                ];
                expect(result).to.deep.equal(should);
            });

            it('left<span>text</span>right', () => {
                const str = 'left<span>text</span>right';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'left' },
                    { name: 'span', value: 'text' },
                    { name: 'span', value: 'right' },
                ];
                expect(result).to.deep.equal(should);
            });

            it('<span src="text">text</span>right', () => {
                const str = '<span src="text">text</span>right';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'text', attrs: { src: 'text' } },
                    { name: 'span', value: 'right' },
                ];
                expect(result).to.deep.equal(should);
            });

            it('<br>text', () => {
                const str = '<br>text';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'br' },
                    { name: 'span', value: 'text' },
                ];
                expect(result).to.deep.equal(should);
            });

            it('<br/>text', () => {
                const str = '<br>text';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'br' },
                    { name: 'span', value: 'text' },
                ];
                expect(result).to.deep.equal(should);
            });

            it('<span>firts<span><img src="http://url.tu"/>', () => {
                const str = '<span>firts</span><img src="http://url.tu"/>';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'firts' },
                    { name: 'img', attrs: { src: 'http://url.tu' } },
                ];
                // console.log(result);

                expect(result).to.deep.equal(should);
            });

            it('<span style="color:red">firts<span>', () => {
                const str = '<span style="color:red">firts</span>';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'firts', attrs: { style: { color: 'red' } } },
                ];

                expect(result).to.deep.equal(should);
            });

            it('<span style="color:#00ff0005;background-color:#ff00ff">firts<span>', () => {
                const result = Parsing.html_v2('<span style="color:#00ff0005;background-color:#ff00ff">firts</span>');
                const should = [
                    { name: 'span', value: 'firts', attrs: { style: { color: 'rgba(0, 255, 0, 0.02)', backgroundColor: 'rgb(255, 0, 255)' } } },
                ];
                expect(result).to.deep.equal(should);
            });
            it('<span>A &nbsp;<span>&nbsp;&nbsp;', () => {
                const str = '<span>A &nbsp;</span>&nbsp;&nbsp;';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'A  ' },
                    { name: 'span', value: '  ' },
                // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
                ];
                expect(result).to.deep.equal(should);
            });
            it('<span>a<</span><span>&nbsp;</span>', () => {
                const str = '<span>a<</span><span>&nbsp;</span>';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'a<' },
                    { name: 'span', value: ' ' },
                // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
                ];
                expect(result).to.deep.equal(should);
            });
            it('<span>a&lt;</span><span>&nbsp;</span>', () => {
                const str = '<span>a&lt;</span><span>&nbsp;</span>';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'a<' },
                    { name: 'span', value: ' ' },
                // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
                ];
                expect(result).to.deep.equal(should);
            });
            it('<span>first<span><a href="http://url.tu">text</a>', () => {
                const str = '<span>first</span><a href="http://url.tu">text</a>';
                const result = Parsing.html(str);
                const should = [
                    { name: 'span', value: 'first' },
                    { name: 'a', value: 'text', attrs: { href: 'http://url.tu' } },
                ];
                expect(result).to.deep.equal(should);
            });
            it('<a href="...">text</a>', () => {
                const str = '<a href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0">text</a>';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'a', value: 'text', attrs: { href: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0' } },
                ];
                expect(result).to.deep.equal(should);
            });
            it('<div>no define1 </div> text <b> bold</b>', () => {
                const str = '<div style="color:#ff00">no define1 <div>in</div></div> text <b> bold</b>';
                const result = Parsing.html_v2(str);
                const should = [
                    { name: 'span', value: 'no define1 in' },
                    { name: 'span', value: ' text ' },
                    { name: 'span', value: ' bold' },
                ];
                expect(result).to.deep.equal(should);
            });
        });
    }

    describe('html', () => {
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
        it('<span src="text">text</span>right', () => {
            const str = '<span src="text">text</span>right';
            const result = Parsing.html(str);
            const should = [
                { name: 'span', value: 'text', attrs: { src: 'text' } },
                { name: 'span', value: 'right' },
            ];
            expect(result).to.deep.equal(should);
        });

        it('<br>text', () => {
            const str = '<br>text';
            const result = Parsing.html(str);
            const should = [
                { name: 'br' },
                { name: 'span', value: 'text' },
            ];
            expect(result).to.deep.equal(should);
        });

        it('<br/>text', () => {
            const str = '<br>text';
            const result = Parsing.html(str);
            const should = [
                { name: 'br' },
                { name: 'span', value: 'text' },
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

        it('<span>A <span>', () => {
            const str = '<span>A &nbsp;</span>&nbsp;&nbsp;';
            const result = Parsing.html(str);
            const should = [
                { name: 'span', value: 'A  ' },
                { name: 'span', value: '  ' },
            // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
            ];
            expect(result).to.deep.equal(should);
        });

        it('<span>a<</span><span>&nbsp;</span>', () => {
            const str = '<span>a<</span><span>&nbsp;</span>';
            const result = Parsing.html(str);
            const should = [
                { name: 'span', value: 'a<' },
                { name: 'span', value: ' ' },
            // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
            ];
            expect(result).to.deep.equal(should);
        });

        it('<span>a&lt;</span><span>&nbsp;</span>', () => {
            const str = '<span>a<</span><span>&nbsp;</span>';
            const result = Parsing.html(str);
            const should = [
                { name: 'span', value: 'a<' },
                { name: 'span', value: ' ' },
            // { name: 'span', value: ' ', attrs: { style: { color: 'red', backgroundColor: '#ff00ff' } } },
            ];
            expect(result).to.deep.equal(should);
        });
        // <a href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0">fox</a>
        it('<span>first<span><a href="http://url.tu">text</a>', () => {
            const str = '<span>first</span><a href="http://url.tu">text</a>';
            const result = Parsing.html(str);
            const should = [
                { name: 'span', value: 'first' },
                { name: 'a', value: 'text', attrs: { href: 'http://url.tu' } },
            ];
            expect(result).to.deep.equal(should);
        });
        it('<a href="...">text</a>', () => {
            const str = '<a href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0">text</a>';
            const result = Parsing.html(str);
            const should = [
                { name: 'a', value: 'text', attrs: { href: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0' } },
            ];
            expect(result).to.deep.equal(should);
        });
    });
    describe('_str_to_attrs', () => {
        it('1', () => {
            const str = 'p1=v1';
            const result = Parsing._str_to_attrs(str);
            const should = {
                p1: 'v1',
            };
            expect(result).to.deep.equal(should);
        });

        it('2', () => {
            const str = 'p1=v1 p2="v2"';
            const result = Parsing._str_to_attrs(str);
            const should = {
                p1: 'v1',
                p2: 'v2',
            };
            expect(result).to.deep.equal(should);
        });
        it('3', () => {
            const str = 'p1=v1 p2="v2" p3';
            const result = Parsing._str_to_attrs(str);
            const should = {
                p1: 'v1',
                p2: 'v2',
                p3: undefined,
            };
            expect(result).to.deep.equal(should);
        });

        it('4', () => {
            const str = 'p1=  v1 p2 = "v2" p3 p4="test = space"';
            const result = Parsing._str_to_attrs(str);
            const should = {
                p1: 'v1',
                p2: 'v2',
                p3: undefined,
                p4: 'test = space',
            };
            expect(result).to.deep.equal(should);
        });

        // <a href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0"
        it('5', () => {
            const str = 'href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0"';
            const result = Parsing._str_to_attrs(str);
            const should = {
                href: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0',
            };
            expect(result).to.deep.equal(should);
        });
    });
});
