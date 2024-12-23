class CssClass {
    static have(css, className) {
        return (css || '').split(' ').indexOf(className) >= 0;
    }

    static add(css, ...classNames) {
        let out = css || '';
        classNames.map((className) => {
            if (!this.have(out, className)) {
                out += ((out ? ' ' : '') + className).trim();
            }
        });

        return out;
    }

    static remove(css, ...classNames) {
        return (css || '').split(' ').filter((it) => (classNames.indexOf(it) === -1)).join(' ').trim();
    }

    static toggle(css, className) {
        return this.have(css, className) ? this.remove(css, className) : this.add(css, className);
    }

    static eq(className1, className2) {
        return className1.trim() === className2.trim();
    }
}

export default CssClass;
