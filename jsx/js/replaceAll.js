export default (str, from, to = '', repeat = false) => {
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
};
