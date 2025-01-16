import replaceAll from './replaceAll';

class Parsing {
    constructor(html) {
        this.setHtml(html);
    }

    setHtml(code) {
        this.root = document.createElement('html');
        this.root.innerHTML = code;
    }

    each(callback, deep = -1) {
        return this._each(callback, this.root.children[1], 0, deep);
    }

    _each(callback, node, level, deep) {
        for (let i = 0; i < node.childNodes.length; i++) {
            const item = node.childNodes[i];
            const info = this.getinfo(item);
            if (callback({
                item, parent: node, ...info, i, level,
            }) === false) {
                return false;
            }

            if (info.type !== 'text' && item.childNodes.length && (deep < 0 || deep < level)) {
                if (this._each(callback, item, level + 1, deep) === false) {
                    return false;
                }
            }
        }
        return true;
    }

    map(callback) {
        return this._map(callback, this.root.children[1], 0);
    }

    _map(callback, node, level) {
        const out = [];
        for (let i = 0; i < node.childNodes.length; i++) {
            const item = node.childNodes[i];
            const info = this.getinfo(item);

            const data = callback ? (callback({
                item, parent: node, ...info, i, level,
            }) || info) : info;

            if (info.type !== 'text' && item.childNodes.length) {
                data.childs = this._map(callback, item, level + 1);
            }
            out.push(data);
        }
        return out;
    }

    getinfo(node) {
        return {
            style: this._getStyle(node.style),
            attributes: this._getAttr(node.attributes),
            value: this._prepareValue(this._getValue(node)),
            className: this._prepareClassName(node),
            tag: this._prepareTag(node),
            type: this._prepareType(node),
        };
    }

    _getStyle(style) {
        const out = {};
        if (style && style.length) {
            for (let j = 0; j < style.length; j++) {
                out[style[j]] = style[style[j]];
            }
        }
        return out;
    }

    _getAttr(attributes) {
        const out = {};
        if (attributes && attributes.length) {
            for (let i = 0; i < attributes.length; i++) {
                if (['id', 'class', 'style'].indexOf(attributes[i].name) === -1) {
                    out[attributes[i].name] = attributes[i].value;
                }
            }
        }
        return out;
    }

    _getValue(it) {
        return it.nodeValue || it.innerText;
    }

    _prepareValue(value) {
        return replaceAll(value, ['  ', /\u00a0/g, '\n'], [' ', ' ', ''], true);
    }

    _prepareClassName(it) {
        return it.className || '';
    }

    _prepareTag(it) {
        return it.tagName || it.nodeName || '';
    }

    _prepareType(it) {
        return it.nodeType == 3 ? 'text' : 'tag';
    }
}

export default Parsing;
