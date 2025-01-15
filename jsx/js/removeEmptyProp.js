const isEmpty = (value) => (value === undefined || `${value}`.trim() === '');

const removeEmptyProp = (obj, emptyCheck = isEmpty) => {
    const out = {};
    Object.keys(obj).map((key) => {
        if (!emptyCheck(obj[key])) {
            out[key] = obj[key];
        }
    });
    return out;
};

export default removeEmptyProp;
