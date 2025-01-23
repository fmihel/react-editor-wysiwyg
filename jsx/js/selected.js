/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */

import eq from './eq.js';
import { isEnd } from '../EditorTags/End/End.jsx';
import get from './get.js';
import DOM from './DOM.js';

class Selected {
    constructor() {
        this._callbacks = [];
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
        this._callbacks.push(callback);
        return () => {
            this._callbacks = this._callbacks.filter((it) => it !== callback);
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

        return (start !== false && stop !== false) ? data.slice(start, stop + 1).filter((it) => !isEnd(it.id)) : [];
    }

    _get_ids_selected(range) {
        // console.log('Selected elements:');
        const out = [];
        range.cloneContents().querySelectorAll('*').forEach((element) => {
            if ('id' in element && element.id) {
                out.push(element.id);
            }
        });
        return out;
        // console.log('Selected text/elements parent:');
        // console.log(range.commonAncestorContainer.parentNode);
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
            // console.log({ start, end, range });
            return { from: start, to: end /* ids: this._get_ids_selected(range) */ };
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
                this._callbacks.map((callback) => callback(range));
                this._rangePrev = range;
            }
        } else {
            if (this._rangePrev) {
                this._callbacks.map((callback) => callback(false));
            }
            this._rangePrev = false;
        }
    }

    clear() {
        const sel = this.selection();
        if (sel) {
            sel.removeAllRanges();
        }
    }

    /** признак, что нет выбранныех элементов */
    empty() {
        const selection = this.selection();
        if (selection && !selection.isCollapsed) {
            return false;
        }
        return true;
    }
}

export default new Selected();
