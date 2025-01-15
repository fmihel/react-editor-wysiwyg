import styleNameCssToReact from './styleNameCssToReact';

export default (style) => {
    const out = {};
    Object.keys(style).map((name) => {
        out[styleNameCssToReact(name)] = style[name];
    });
    return out;
};
