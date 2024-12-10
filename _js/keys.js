export default (o, param = {}) => Object.keys(o).filter((key) => {
    if ('include' in param && param.include.length) {
        return param.include.indexOf(key) > -1;
    } if ('exclude' in param && param.exclude.length) {
        return param.exclude.indexOf(key) === -1;
    }
    return true;
});
