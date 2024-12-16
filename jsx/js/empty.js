export default (value) => {
    if (value === '' || value === false || value === null || value === undefined) {
        return true;
    }

    if (Array.isArray(value)) {
        return (value.length === 0);
    }

    if (typeof value === 'object') {
        return (Object.keys(value).length === 0);
    }
    return false;
};
