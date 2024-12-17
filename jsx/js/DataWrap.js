/* eslint-disable no-return-assign */
class DataWrap {
    constructor(data = []) {
        this.data = [];
        this.indexs = {};
        this._locksync = 0;
        this.sync();
    }

    itemById(id) {
        return id in this.indexs ? this.data[this.indexs[id]] : false;
    }

    itemByIndex(index) {
        return this.data[index];
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
        if (!this._locksync === 0) {
            this.indexs = {};
            this.data.map((it, i) => this.indexs[it.id] = i);
        }
    }

    add(data) {
        this.data = [...this.data, ...data];
        this.sync();
    }
}
