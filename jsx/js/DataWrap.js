/* eslint-disable no-return-assign */
class DataWrap {
    constructor(data = []) {
        this.data = data;
        this.indexs = {};
        this._locksync = 0;
        this.sync();
    }

    itemById(id) {
        return id in this.indexs ? this.data[this.indexs[id]] : false;
    }

    itemByIndex(index) {
        return index >= 0 && index < this.data.length ? this.data[index] : false;
    }

    index(id) {
        return id in this.indexs ? this.indexs[id] : false;
    }

    lockSync() {
        this._locksync += 1;
    }

    unlockSync() {
        this._locksync -= 1;
        if (this._locksync === 0) {
            this.sync();
        }
    }

    sync() {
        if (this._locksync === 0) {
            // console.time('sync');
            this.indexs = {};
            this.data.map((it, i) => this.indexs[it.id] = i);
            // console.timeEnd('sync');
        }
    }

    add(data) {
        this.data = [...this.data, ...data];
        this.sync();
        return this.data;
    }

    change(data) {
        this.data = data;
        this.sync();
        return this.data;
    }

    prev(id) {
        return this.itemByIndex(this.index(id) - 1);
    }

    next(id) {
        return this.itemByIndex(this.index(id) + 1);
    }

    nearest(id, findedCallback, left = true) {
        const index = this.index(id);
        let from; let step;
        if (left) {
            from = index - 1;
            step = -1;
        } else {
            from = index + 1;
            step = 1;
        }
        let i = from;
        while (i >= 0 && i < this.data.length) {
            const it = this.data[i];
            if (findedCallback(it)) {
                return it;
            }
            i += step;
        }

        return false;
    }
}

export default DataWrap;
