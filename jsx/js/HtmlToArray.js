class HtmlToArray {
    constructor(code) {
        this.setHtml(code);
    }

    setHtml(code) {
        this.root = document.createElement('html');
        this.root.innerHTML = code;
    }

    each(callback, node = undefined) {
        const item = node || this.root.children[1];
        for (let i = 0; i < item.childNodes.length; i++) {
            const it = item.childNodes[i];
            const style = this._getStyle(it.style);
            const attributes = this._getAttr(it.attributes);
            const value = this._prepareValue(this._getValue(it));
            if (callback(it, value, style, attributes, i) === false) {
                break;
            }
        }
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
                    out[attributes[i].name] = attributes[i];
                }
            }
        }
        return out;
    }

    _getValue(it) {
        return it.nodeValue || it.innerText;
    }

    _replace(str, from, to = '', repeat = false) {
        let out = str;
        const isarto = Array.isArray(to);
        (Array.isArray(from) ? from : [from]).map((search, i) => {
            const toValue = isarto ? to[i] : to;
            const type = typeof search;
            if (repeat) {
                while ((type === 'string' && out.indexOf(search) > -1) || (type === 'object' && search.test(out))) {
                    out = out.replaceAll(search, toValue);
                }
            } else out = out.replaceAll(search, toValue);
        });
        return out;
    }

    _prepareValue(value) {
        return this._replace(value, ['  ', /\u00a0/g], [' ', '+'], true);
    }
}

export default HtmlToArray;
