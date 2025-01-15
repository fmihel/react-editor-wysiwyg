/* eslint-disable no-undef */
import chai from 'chai';
import HtmlParsing from '../../../jsx/js/HtmlParsing';

const { expect } = chai;
if (typeof window !== 'undefined') {
    describe('HtmlParsing', () => {
        describe('each', () => {
            it('each("only text")', () => {
                const html = new HtmlParsing('only text');
                const calc = [];
                html.each((o) => {
                    calc.push(o.value);
                });

                const should = ['only text'];
                expect(should).to.deep.equal(calc);
            });

            it('each("left<span>center</span>right")', () => {
                const html = new HtmlParsing('left<span>center</span>right');
                const calc = [];
                html.each((o) => {
                    // console.log(o.tag, o.value, { item: o.item }, o.type);
                    calc.push({
                        tag: o.tag,
                        value: o.value,
                    });
                });

                const should = [
                    { tag: '#text', value: 'left' },
                    { tag: 'SPAN', value: 'center' },
                    { tag: '#text', value: 'center' },
                    { tag: '#text', value: 'right' },
                ];
                expect(should).to.deep.equal(calc);
            });

            it('each("left<span>center<div>child</div></span>right")', () => {
                const html = new HtmlParsing('left<span>center<div>child</div></span>right');
                const calc = [];
                html.each((o) => {
                    // console.log(o.tag, o.value, { item: o.item }, o.type);
                    calc.push({ tag: o.tag, value: o.value });
                });

                const should = [
                    { tag: '#text', value: 'left' },
                    { tag: 'SPAN', value: 'centerchild' },
                    { tag: '#text', value: 'center' },
                    { tag: 'DIV', value: 'child' },
                    { tag: '#text', value: 'child' },
                    { tag: '#text', value: 'right' },
                ];
                expect(should).to.deep.equal(calc);
            });
        });

        describe('map', () => {
            it('map("only text")', () => {
                const html = new HtmlParsing('only text');
                const calc = html.map(({ type, value }) => ({ type, value }));

                const should = [{ type: 'text', value: 'only text' }];
                expect(should).to.deep.equal(calc);
            });
            it('map("<b>A</b><b>B</b>")', () => {
                const html = new HtmlParsing('<b>A</b><b>B</b>');
                const calc = html.map(({ type, value }) => ({ type, value }));
                const should = [
                    {
                        type: 'tag',
                        value: 'A',
                        childs: [
                            { type: 'text', value: 'A' },
                        ],
                    }, {
                        type: 'tag',
                        value: 'B',
                        childs: [
                            { type: 'text', value: 'B' },
                        ],
                    }];
                expect(should).to.deep.equal(calc);
            });

            it('map("<b>A<span>in</span>C</b><b>B</b>")', () => {
                const html = new HtmlParsing('<b>A<span>in</span>C</b><b>B</b>');
                const calc = html.map(({ type, value }) => ({ type, value }));

                const should = [
                    {
                        type: 'tag',
                        value: 'AinC',
                        childs: [
                            { type: 'text', value: 'A' },
                            { type: 'tag', value: 'in', childs: [{ type: 'text', value: 'in' }] },
                            { type: 'text', value: 'C' },
                        ],
                    }, {
                        type: 'tag',
                        value: 'B',
                        childs: [
                            { type: 'text', value: 'B' },
                        ],
                    }];
                expect(should).to.deep.equal(calc);
            });

            it('map("<b>A<table>...</table>C</b><b>B</b>")', () => {
                const html = new HtmlParsing(`
                    <b>
                        A
                        <table>
                            <thead>
                                <tr><th>h1</th><th>h2</th><tr>
                            </thead>
                            <tbody>
                                <tr><td>c1</td><td>c2</td><tr>
                                <tr><td>c3</td><td>c4</td><tr>
                            </tbody>
                        </table>
                        C
                    </b>
                    <b>B</b>
                `.replaceAll('\n', '').replaceAll('\t', ''));
                const calc = html.map(({ type, value }) => ({ type, value }));

                const should = [
                    {
                        type: 'tag',
                        value: ' A h1h2 c1c2 c3c4 C ',
                        childs: [
                            {
                                type: 'text',
                                value: ' A ',
                            },
                            {
                                type: 'tag',
                                value: ' h1h2 c1c2 c3c4 ',
                                childs: [
                                    {
                                        type: 'text',
                                        value: ' ',
                                    },
                                    {
                                        type: 'tag',
                                        value: ' h1h2 ',
                                        childs: [
                                            {
                                                type: 'text',
                                                value: ' ',
                                            },
                                            {
                                                type: 'tag',
                                                value: 'h1h2',
                                                childs: [
                                                    {
                                                        type: 'tag',
                                                        value: 'h1',
                                                        childs: [
                                                            {
                                                                type: 'text',
                                                                value: 'h1',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: 'tag',
                                                        value: 'h2',
                                                        childs: [
                                                            {
                                                                type: 'text',
                                                                value: 'h2',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'tag',
                                                value: ' ',
                                                childs: [
                                                    {
                                                        type: 'text',
                                                        value: ' ',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        type: 'text',
                                        value: ' ',
                                    },
                                    {
                                        type: 'tag',
                                        value: ' c1c2 c3c4 ',
                                        childs: [
                                            {
                                                type: 'text',
                                                value: ' ',
                                            },
                                            {
                                                type: 'tag',
                                                value: 'c1c2',
                                                childs: [
                                                    {
                                                        type: 'tag',
                                                        value: 'c1',
                                                        childs: [
                                                            {
                                                                type: 'text',
                                                                value: 'c1',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: 'tag',
                                                        value: 'c2',
                                                        childs: [
                                                            {
                                                                type: 'text',
                                                                value: 'c2',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'tag',
                                                value: ' ',
                                                childs: [
                                                    {
                                                        type: 'text',
                                                        value: ' ',
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'tag',
                                                value: 'c3c4',
                                                childs: [
                                                    {
                                                        type: 'tag',
                                                        value: 'c3',
                                                        childs: [
                                                            {
                                                                type: 'text',
                                                                value: 'c3',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: 'tag',
                                                        value: 'c4',
                                                        childs: [
                                                            {
                                                                type: 'text',
                                                                value: 'c4',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'tag',
                                                value: ' ',
                                                childs: [
                                                    {
                                                        type: 'text',
                                                        value: ' ',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        type: 'text',
                                        value: ' ',
                                    },
                                ],
                            },
                            {
                                type: 'text',
                                value: ' C ',
                            },
                        ],
                    },
                    {
                        type: 'text',
                        value: ' ',
                    },
                    {
                        type: 'tag',
                        value: 'B',
                        childs: [
                            {
                                type: 'text',
                                value: 'B',
                            },
                        ],
                    },
                    {
                        type: 'text',
                        value: ' ',
                    },
                ];

                expect(should).to.deep.equal(calc);
            });
        });
    });
}
