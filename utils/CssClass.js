class CssClass {
    static have(css, className) {
        return this.asArray(css).indexOf(className.trim()) >= 0;
    }

    static add(css, ...classNames) {
        const out = this.asArray(css);

        classNames.map((className) => {
            if (out.indexOf(className) === -1) {
                out.push(className.trim());
            }
        });

        return out.join(' ').trim();
    }

    static remove(css, ...classNames) {
        const m = classNames.map((it) => it.trim());
        return this.asArray(css).filter((it) => (m.indexOf(it.trim()) === -1)).join(' ').trim();
    }

    static toggle(css, className) {
        return this.have(css, className) ? this.remove(css, className) : this.add(css, className);
    }

    static eq(className1, className2) {
        return className1.trim() === className2.trim();
    }

    static asArray(css) {
        return (css || '').split(' ').map((c) => c.trim()).filter((c) => c);
    }
}

export default CssClass;
