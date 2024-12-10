/* eslint-disable no-return-assign */
export default (a, b) => {
    const out = {};
    Object.keys(b).map((name) => out[name] = a[name]);
    return out;
};
