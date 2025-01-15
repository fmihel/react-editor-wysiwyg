/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
import regExpResult from './regExpResult';
import styleNameCssToReact from './styleNameCssToReact';
import HtmlParsing from './HtmlParsing';
import removeEmptyProp from './removeEmptyProp';
import styleCssToReact from './styleCssToReact';

const defalt = {
    tags: [
        { name: 'span' },
        { name: 'a' },
        { name: 'img' },
        { name: 'br', noslash: true },
    ],
};

class Parsing {
    html_v2(html) {
        const out = [];
        const dom = new HtmlParsing(html);
        const isEmpty = (v) => v === undefined || `${v}`.trim() === '' || Object.keys(v).length === 0;
        const props = (o) => removeEmptyProp({
            value: o.value,
            attrs: {
                ...o.attributes,
                ...!isEmpty(o.style) ? { style: styleCssToReact(o.style) } : {},
                ...o.className ? { class: o.className } : {},

            },
        }, isEmpty);

        const push = (o) => {
            if (o.tag === '#text' || o.tag === 'SPAN') {
                out.push({ name: 'span', ...props(o) });
            } else
            if (o.tag === 'IMG') {
                out.push({ name: 'img', ...props(o) });
            } else
            if (o.tag === 'BR') {
                out.push({ name: 'br' });
            }
        };

        dom.each((o) => {
            if (o.level === 0) {
                // console.log(o);
                push(o);
            }
        });

        return out;
    }

    html(html, param = defalt) {
        const { tags } = param;
        let pos = 0;

        const out = [];
        //---------------------------------------------------------------
        html = html.trim();
        while (html.indexOf('  ') > -1)html = html.replaceAll('  ', ' ');
        [
            ['&nbsp;', ' '],
            ['&lt;', '<'],
            ['&gt;', '>'],
        ]
            .map((o) => html = html.replaceAll(o[0], o[1]));

        //---------------------------------------------------------------

        while (pos < html.length) {
            const pack = this._get_start(html, tags, pos);

            if (pack) {
                if (pack.lastText) {
                    out.push({ name: 'span', value: pack.lastText });
                } else {
                    if (pack.leftText) {
                        out.push({ name: 'span', value: pack.leftText });
                    }
                    const attrs = this._str_to_attrs(pack.attrs);
                    if (attrs.style) {
                        attrs.style = this._style_parsing(attrs.style);
                    }
                    out.push({
                        name: pack.name,
                        ...pack.value ? { value: pack.value } : {},
                        ...pack.attrs ? { attrs } : {},
                    });
                }
                pos = pack.endPos;
            } else {
                break;
            }
        }
        return out;
    }

    _get_start(html, tags, startPos) {
        const poss = tags.map((tag) => ({ ...tag, pos: html.indexOf(`<${tag.name}`, startPos) })).filter((it) => it.pos > -1).sort((a, b) => a.pos - b.pos);
        if (!poss.length) {
            if (startPos < html.length) {
                return {
                    lastText: html.substring(startPos, html.length),
                    endPos: html.length,
                };
            }

            return false;
        }

        const tag = poss[0];
        const out = {
            leftText: html.substring(startPos, tag.pos),
            name: tag.name,
        };
        startPos += out.leftText.length;

        const end = ['/>', '>'].map((find) => ({ pos: html.indexOf(`${find}`, startPos + 1), name: find })).filter((it) => it.pos > -1).sort((a, b) => a.pos - b.pos);
        if (!end.length) {
            return false;
        }
        out.attrs = html.substring(startPos + `<${tag.name}`.length, end[0].pos).trim();

        if (end[0].name === '/>') {
            out.endPos = end[0].pos + 2;
        } else if (tag.noslash) {
            out.endPos = end[0].pos + 1;
        } else {
            const endTag = `</${tag.name}>`;
            const valueEndPos = html.indexOf(endTag, end[0].pos);
            if (valueEndPos === -1) {
                return false;
            }
            out.value = html.substring(end[0].pos + 1, valueEndPos);
            out.endPos = valueEndPos + endTag.length;
        }

        return out;
    }

    _str_to_attrs(str) {
        const attrs = {};
        const regex = /(\w+)\s*(=\s*(("([^"]*)")|(\w*)))?/gm;

        regExpResult(regex, str, (group) => {
            group = group.filter((g) => g !== undefined);
            if (group.length > 1) {
                attrs[group[1]] = undefined;
                if (group.length > 3) {
                    attrs[group[1]] = group[group.length - 1];
                }
            }
        });

        return attrs;
    }

    _style_parsing(str) {
        const out = {};
        // const str = `color:red;background-image:url("");opacity:0.2;`;
        const regex = /([a-z\-]{2,}):([^;]+)/gm;

        let m;
        while ((m = regex.exec(str)) !== null) {
            let attr;
            m.forEach((match, groupIndex) => {
                if (groupIndex === 1) {
                    attr = styleNameCssToReact(match);
                }

                if (groupIndex === 2) {
                    out[attr] = match;
                }
            });
        }
        return out;
    }
}
export default new Parsing();
