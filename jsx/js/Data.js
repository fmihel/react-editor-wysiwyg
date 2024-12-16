/* eslint-disable camelcase */
import eq from './eq.js';

class Data {
    static find(data, id) {
        return data.find((it) => eq.id(it.id, id));
    }

    static findIndex(data, id) {
        return data.findIndex((it) => eq.id(it.id, id));
    }

    static prev(data, callback) {
        let finded = false;
        let prev = false;
        data.find((it) => {
            if (callback(it)) {
                finded = prev;
                return true;
            }
            prev = it;
        });

        return finded;
    }

    static next(data, callback) {
        let finded = false;
        let prev = false;
        [...data].reverse().find((it) => {
            if (callback(it)) {
                finded = prev;
                return true;
            }
            prev = it;
        });

        return finded;
    }

    static nearest(data, callback, findedCallback, left = true) {
        const index = data.findIndex((it) => callback(it));
        let from; let to; let step;
        if (left) {
            from = index - 1;
            to = 0;
            step = -1;
        } else {
            from = index + 1;
            to = data.length - 1;
            step = 1;
        }
        let i = from;
        while (i >= 0 && i < data.length) {
            const it = data[i];
            if (findedCallback(it)) {
                return it;
            }
            i += step;
        }

        return false;
    }

    static copy(data) {
        return data.map((it) => ({ ...it, style: { ...it.style } }));
    }

    static clone(data) {
        return data.map((it) => ({ ...it, id: this.getid(), style: { ...it.style } }));
        // return _.cloneDeep(data).map((it) => ({ ...it, id: this.getid() }));
    }

    static insert(toData, insertData, toId) {
        const out = this.copy(toData);
        const index = this.findIndex(toData, toId);
        out.splice(index, 0, ...insertData);
        return out;
    }

    static merge(to, from) {
        return to.map((it) => {
            const f = from.find((is) => eq.dataItem(is, it));
            return f ? { ...it, ...f, style: { ...it.style, ...f.style } } : { ...it };
        });
    }

    static ids(data) {
        return this.asArray(data, (item) => item.id);
    }

    static asArray(data, itemToValue) {
        const out = [];
        data.map((item) => out.push(itemToValue(item)));
        return out;
    }
}

export default Data;
