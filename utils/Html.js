/* eslint-disable array-callback-return */
import Parsing from '../jsx/js/Parsing.js';
import EditorTags from '../jsx/EditorTags.jsx';
import eq from '../jsx/js/eq.js';
import styleNameReactToCss from '../jsx/js/styleNameReactToCss.js';
import Style from './Style.js';

const defaultTags = [
    { name: 'span' },
    { name: 'a' },
    { name: 'img' },
    { name: 'br', noslash: true },
];

const typeTag = {
    char: 'span',
    a: 'a',
    img: 'img',
    br: 'br',
};

class Html {
    toData(html, tags = defaultTags) {
        const names = tags.map((it) => it.name);
        const data = [];
        const pars = Parsing.html(html, { tags });

        pars.map((it) => {
            const { name, value, attrs } = it;
            if (names.indexOf(name) > -1) {
                if (name === 'span') {
                    value.split('').map((char) => {
                        data.push(EditorTags.createData('char', { value: char, ...attrs }));
                    });
                } else {
                    data.push(EditorTags.createData(name, {
                        value,
                        ...attrs,
                    }));
                }
            }
        });

        return data;
    }

    fromData(data) {
        const com = [];
        // console.log(data);
        data.map((it) => {
            if (com.length === 0) {
                com.push({ ...it });
            } else if ((com[com.length - 1].type === 'char')
                && eq.object(com[com.length - 1], it, {
                    exclude: ['id', 'value', 'Com'],
                    custom: { style: (style1, style2) => Style.eq(style1, style2) },
                })) {
                com[com.length - 1].value += it.value;
            } else {
                com.push({ ...it });
            }
        });

        return com.map((o) => {
            const {
                id, type, Com, ...attr
            } = o;
            return this.tag({
                ...attr,
                name: typeTag[o.type],
            });
        }).join('');
    }

    tag({ name, value, ...attrs }) {
        if (['br'].indexOf(name) > -1) {
            return `<${name}>`;
        }
        const _attrs = this.attrsAsString(attrs).trim();
        const strAttrs = (_attrs ? ` ${_attrs}` : _attrs);

        if (value) {
            return `<${name}${strAttrs}>${value}</${name}>`;
        }
        return `<${name}${strAttrs}/>`;
    }

    attrsAsString(attrs) {
        return Object.keys(attrs).map((attr) => {
            if (attr === 'style') {
                const style = `${Object.keys(attrs[attr]).map((p) => (Style.isNotEmptyProp(attrs[attr][p]) ? `${styleNameReactToCss(p)}:${attrs[attr][p]}` : '')).filter((s) => s).join(';')}`;
                return style ? `${attr}="${style}"` : '';
            }
            return `${attr}="${attrs[attr]}"`;
        }).join(' ');
    }
}

export default new Html();
