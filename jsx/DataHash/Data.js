/* eslint-disable no-return-assign */
// import { format } from 'date-format-parse';
// import random_str from './random_str';

class Data {
    constructor(data = []) {
        this.data = data;
        this.indexs = {};
        this._lockCreateIndexs = 0;
        this.reCreactIndexs();
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

    lockCreateIndexs() {
        this._lockCreateIndexs += 1;
    }

    unlockCreateIndexs() {
        this._lockCreateIndexs -= 1;
        if (this._lockCreateIndexs === 0) {
            this.reCreactIndexs();
        }
    }

    reCreactIndexs() {
        if (this._lockCreateIndexs === 0) {
            //  const time = `${format(new Date(), 'HH:mm:ss')} sync`;
            // console.time(time);
            this.indexs = {};
            this.data.map((it, i) => this.indexs[it.id] = i);
            // console.timeEnd(time);
        }
    }

    add(data) {
        this.data = [...this.data, ...data];
        this.reCreactIndexs();
        return this.data;
    }

    change(data) {
        this.data = data;
        this.reCreactIndexs();
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

    map(callback) {
        return this.data.map(callback);
    }

    filter(callback) {
        return this.data.filter(callback);
    }

    slice(start, end) {
        return this.data.slice(start, end);
    }
}

export default Data;
