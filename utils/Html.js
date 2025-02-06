/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
import Parsing from '../jsx/js/Parsing.js';
import eq from '../jsx/js/eq.js';
import styleNameReactToCss from '../jsx/js/styleNameReactToCss.js';
import Style from './Style.js';
import HtmlSpecialChars from '../jsx/js/HtmlSpecialChars.js';
import EditorTagClass from '../jsx/EditorTags/EditorTagClass.js';
import removeEmptyProp from '../jsx/js/removeEmptyProp.js';
import styleCssToReact from '../jsx/js/styleCssToReact.js';

const SPACE_HTML = '&nbsp;';
const SPACE_CHAR = ' ';

const typeTag = {
    char: 'span',
    a: 'a',
    img: 'img',
    br: 'br',
    space: 'span',
};

const isEmpty = (v) => v === undefined || `${v}`.trim() === '' || Object.keys(v || {}).length === 0;
const props = (o) => removeEmptyProp({

    attrs: {
        ...o.attributes,
        ...!isEmpty(o.style) ? { style: styleCssToReact(o.style) } : {},
        ...o.className ? { class: o.className } : {},

    },
}, isEmpty);

const defaultTagToData = (o) => {
    if (o.tag === '#text' || o.tag === 'SPAN') {
        return { name: 'span', value: o.value, ...props(o) };
    } if (o.tag === 'A') {
        return { name: 'a', value: o.value, ...props(o) };
    } if (o.tag === 'IMG') {
        return { name: 'img', ...props(o) };
    } if (o.tag === 'BR') {
        return { name: 'br' };
    }
    if (!isEmpty(o.value)) return { name: 'span', value: o.value, ...props(o) };

    return false;
};

class Html {
    toData(html, params = {}) {
        const { tagToData, editorTagClass } = {
            tagToData: defaultTagToData,
            editorTagClass: EditorTagClass,
            ...params,
        };

        const out = [];
        const list = this._parsing(html, tagToData);
        try {
            list.map((it) => {
                const { name, value = '', attrs } = it;
                if (name === 'span') {
                    value.split('').map((char) => {
                        if (char === SPACE_CHAR) {
                            out.push(editorTagClass.createData('space', { ...attrs }));
                        } else {
                            out.push(editorTagClass.createData('char', { value: char, ...attrs }));
                        }
                    });
                } else {
                    out.push(editorTagClass.createData(name, {
                        value,
                        ...attrs,
                    }));
                }
            });
        } catch (error) {
            console.log('-----------------------------');
            console.log(html);
            console.log(list);
        }

        return out;
    }

    fromData(data, selects = []) {
        const com = [];

        data.map((it) => {
            if (selects.length === 0 || selects.indexOf(it.id) > -1) {
                if (com.length === 0) {
                    com.push({ ...it });
                } else if (this._eq_by_attr(['char', 'space'], it, com[com.length - 1])) {
                    com[com.length - 1].value += it.value;
                } else {
                    com.push({ ...it });
                }
            }
        });

        return com.map((o) => {
            const {
                id, type, Com, ...attr
            } = o;

            // const name = typeTag[o.type];

            return this.tag({
                ...attr,
                name: typeTag[o.type],
            });
        }).join('');
    }

    asText(html) {
        const p = new Parsing(html);
        return p.asText();
    }

    tag({ name, value, ...attrs }) {
        if (['br'].indexOf(name) > -1) {
            return `<${name}>`;
        }
        const _attrs = this.attrsAsString(attrs).trim();
        const strAttrs = (_attrs ? ` ${_attrs}` : _attrs);

        if (value) {
            if (name === 'span' && !strAttrs) {
                return HtmlSpecialChars.code(value);
            }
            return `<${name}${strAttrs}>${HtmlSpecialChars.code(value)}</${name}>`;
        }
        return `<${name}${strAttrs}/>`;
    }

    attrsAsString(attrs) {
        return Object.keys(attrs).map((attr) => {
            if (attr === 'style') {
                const style = `${Object.keys(attrs[attr]).map((p) => (!Style.isEmptyProp(attrs[attr][p]) ? `${styleNameReactToCss(p)}:${attrs[attr][p]}` : '')).filter((s) => s).join(';')}`;
                return style ? `${attr}="${style}"` : '';
            }
            if (attr === 'class') {
                return attrs[attr].trim() ? `${attr}="${attrs[attr]}"` : '';
            }
            return `${attr}="${attrs[attr]}"`;
        }).join(' ');
    }

    _eq_by_attr(types, current, last, exclude = ['id', 'value', 'Com']) {
        return ((types.indexOf(current.type) > -1 && types.indexOf(last.type) > -1)
            && eq.object(last, current, {
                exclude: [...exclude, 'type'],
                custom: { style: (style1, style2) => Style.eq(style1, style2) },
            }));
    }

    _spaceAsNbsp(str) {
        return str.replaceAll(' ', SPACE_HTML);
    }

    _parsing(html, tagToData) {
        const out = [];
        const dom = new Parsing(html);

        dom.each((o) => {
            const data = tagToData(o);
            if (data) {
                out.push(data);
            }
        }, 0);

        return out;
    }
}

export default new Html();
