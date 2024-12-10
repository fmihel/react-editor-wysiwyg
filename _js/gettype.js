export default (value) => {
    if (value === null) {
        return 'null';
    }

    return Array.isArray(value) ? 'array' : typeof value;
};
