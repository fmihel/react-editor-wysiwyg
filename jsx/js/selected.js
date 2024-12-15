/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */

import eq from './eq.js';
import { isNotEnd } from '../EditorTags/End/End.jsx';
import get from './get.js';

class Selected {
    constructor() {
        this._list = [];
        this._rangePrev = false;
        this._html = document.getElementsByTagName('html');
        if (this._html.length) {
            this._html = this._html[0];
            this._html.addEventListener('mouseup', () => { this._hanlder(); });
            this._html.addEventListener('mousemove', () => { this._hanlder(); });
        } else {
            throw new Error('document.getElementsByTagName(\'html\') is undefined');
        }

        // setTimeout(() => {
        //     const range = this.getRangeDom();
        //     console.log(range);
        // }, 5000);
    }

    selection() {
        const selection = window.getSelection ? window.getSelection() : false;
        return selection && selection.rangeCount ? selection : false;
        // return selection && selection.anchorNode ? selection : false;
    }

    get(data) {
        const range = this.getRange();
        if (range) {
            return this._filter(range.from, range.to, data);
        }
        return [];
    }

    get_ids(data) {
        return this.get(data).map((it) => it.id);
    }

    on(callback) {
        this._list.push(callback);
        return () => {
            this._list = this._list.filter((it) => it !== callback);
        };
    }

    _filter(from, to, data) {
        let start = false;
        let stop = false;

        data.find((it, i) => {
            if (eq.id(it.id, from)) {
                if (start === false) {
                    start = i;
                } else {
                    stop = i;
                }
            }
            if (eq.id(it.id, to)) {
                if (start === false) {
                    start = i;
                } else {
                    stop = i;
                }
            }
            return (start !== false && stop !== false);
        });

        return (start !== false && stop !== false) ? data.slice(start, stop + 1).filter((it) => isNotEnd(it.id)) : [];
    }

    getRangeDom() {
        const selection = this.selection();
        if (selection && !selection.isCollapsed) {
            const rangeToDom = (dom, offSet) => {
                if (dom.hasChildNodes()) {
                    return dom.childNodes[offSet];
                }
                return dom.parentElement;
            };
            const range = selection.getRangeAt(0);

            const start = rangeToDom(range.startContainer, range.startOffset);
            const end = rangeToDom(range.endContainer, range.endOffset - 1);
            // const from = selection.anchorNode.parentElement.id;
            // const to = selection.focusNode.parentElement.id;
            console.log({ start, end, range });
            return { from: start, to: end };
        }
        return false;
    }

    getRange() {
        const range = this.getRangeDom();
        const from = get(range, ['from', 'id'], false);
        const to = get(range, ['to', 'id'], false);

        return range && from && to ? { from, to } : false;
    }

    _hanlder() {
        const range = this.getRange();

        if (range) {
            if (this._rangePrev === false || this._rangePrev.from !== range.from || this._rangePrev.to !== range.to) {
                this._list.map((callback) => callback(range));
                this._rangePrev = range;
            }
        } else {
            if (this._rangePrev) {
                this._list.map((callback) => callback(false));
            }
            this._rangePrev = false;
        }
    }
}

export default new Selected();
