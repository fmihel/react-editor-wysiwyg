import getid from '../js/getid';

class DataUtils {
    static copy(data) {
        return data.map((it) => ({ ...it, style: { ...it.style } }));
    }

    static clone(data) {
        return data.map((it) => ({
            ...it,
            id: getid(),
            style: { ...it.style },
        }));
    }

    static insert(toData, insertData, toId) {
        const out = this.copy(toData);
        const index = toData.findIndex(toData, ({ id }) => id === toId);
        out.splice(index, 0, ...insertData);
        return out;
    }
}

export default DataUtils;
