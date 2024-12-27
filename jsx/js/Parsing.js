/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
import regExpResult from './regExpResult';
import styleNameCssToReact from './styleNameCssToReact';

const defalt = {
    tags: [
        { name: 'span' },
        { name: 'a' },
        { name: 'img' },
        { name: 'br', noslash: true },
    ],
};

class Parsing {
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

        const regex = /[a-zA-Z0-9\-_]+(=(("[a-z0-9=\(\)\[\]\{\}+\-_~:;,\.*&\^\$\#\@/\!\s]*")|[^"'\s])*)?/gm;
        // const regex = /([\w\-_]+)\s*=\s*("[\s\w~!@#$%^&*()\-+_={}\[\]:;|\\\/?.,><|`]+"|[^"\s]*)?/gm;
        // ([^=]+)\s*=\s*(("[\s\w~!@#$%^&*()\-+_={}\[\]:;|\\\/?.,><|`]*")|([^"\s=]*))
        // \w+=?(("[^"]*")?)|([^"]*)?
        // const str = `style="border:1px solid red" string="text" sybols=qwsqws=23j_ empty`;
        let attr;

        regExpResult(regex, str, (group) => {
            group.map((match, groupIndex) => {
                // const attr = match[1];
                // const value = match[2].replaceAll('"', '');
                // attrs[attr] = value;
                if (groupIndex === 0) {
                    attr = match;
                }
                if (groupIndex === 1) {
                    if (match) {
                        attr = attr.replace(match, '');
                        if (match.charAt(0) === '=') {
                            match = match.replace('=', '');
                        }
                        if (match.charAt(0) === '"') {
                            match = match.replace('"', '');
                            match = match.split('').reverse().join('').replace('"', '')
                                .split('')
                                .reverse()
                                .join('');
                        }
                        if (match.charAt(0) === '\'') {
                            match = match.replace('\'', '');
                            match = match.split('').reverse().join('').replace('\'', '')
                                .split('')
                                .reverse()
                                .join('');
                        }
                    }
                    attrs[attr] = match;
                }
            });
        });
        // let m;
        // while ((m = regex.exec(str)) !== null) {
        //     if (m.index === regex.lastIndex) {
        //         regex.lastIndex++;
        //     }

        //     let attr;
        //     m.forEach((match, groupIndex) => {
        //         if (groupIndex === 0) {
        //             attr = match;
        //         }

        //         if (groupIndex === 1) {
        //             if (match) {
        //                 attr = attr.replace(match, '');
        //                 if (match.charAt(0) === '=') {
        //                     match = match.replace('=', '');
        //                 }
        //                 if (match.charAt(0) === '"') {
        //                     match = match.replace('"', '');
        //                     match = match.split('').reverse().join('').replace('"', '')
        //                         .split('')
        //                         .reverse()
        //                         .join('');
        //                 }
        //                 if (match.charAt(0) === '\'') {
        //                     match = match.replace('\'', '');
        //                     match = match.split('').reverse().join('').replace('\'', '')
        //                         .split('')
        //                         .reverse()
        //                         .join('');
        //                 }
        //             }
        //             attrs[attr] = match;
        //         }
        //     });
        // }
        // console.log({ str, attrs });
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
