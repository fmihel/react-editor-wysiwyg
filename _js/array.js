class array {
    static addUnique(toArray, ...elements) {
        const out = [...toArray];
        elements.map((add) => {
            if (toArray.indexOf(add) === -1) {
                out.push(add);
            }
        });
        return out;
    }
}

export default array;
