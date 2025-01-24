/* eslint-disable camelcase */
import { isBr } from '../EditorTags/Br/Br.jsx';
import DOM from './DOM.js';

class CursorHandler {
    static moveLeft(shiftSelect, cursor, prev, dataHash) {
        let list = [];
        if (prev) {
            const prevIn = shiftSelect.indexOf(prev.id);
            if (prevIn > -1) {
            // движени курсор внутри выбранного интервала ( возвращаемся)
                list = shiftSelect.slice(0, prevIn);
            } else {
            // движени курсор вне выбранного интервала
                const leftIndex = dataHash.index(prev.id);
                const rightIndex = shiftSelect.length ? dataHash.index(shiftSelect[shiftSelect.length - 1]) + 1 : dataHash.index(cursor);

                list = dataHash.slice(leftIndex, rightIndex);
                list = list.map((it) => it.id);
            }
        } else {
            list = shiftSelect;
        }
        return list;
    }

    static moveRight(shiftSelect, cursor, next, dataHash) {
        let list = [];
        if (next) {
            const nextIn = shiftSelect.indexOf(next.id);
            if (nextIn > -1) {
            // движени курсор внутри выбранного интервала ( возвращаемся)
                list = shiftSelect.slice(nextIn);
            } else if (shiftSelect.length === 1 && shiftSelect.indexOf(cursor) > -1) {
            // случай когда возвращались и остался последний элемент
                list = [];
            } else {
            // движени курсор вне выбранного интервала
                const leftIndex = dataHash.index(shiftSelect.length ? shiftSelect[0] : cursor);
                const rightIndex = dataHash.index(next.id);
                list = dataHash.slice(leftIndex, rightIndex);
                list = list.map((it) => it.id);
            }
        } else {
            list = shiftSelect;
        }
        return list;
    }

    static moveUp(cursor, dataHash) {
        let move = false;
        const start_line = dataHash.nearest(cursor, (it) => isBr(it));// начало текущей строки строки
        if (start_line) {
            let off = dataHash.delta(cursor, (it) => isBr(it));// кол-во до левого края

            const next_line_start = dataHash.nearest(start_line.id, (it) => isBr(it));

            if (next_line_start) {
                move = dataHash.nearest(next_line_start.id, (it) => {
                    off--;
                    return off < 0 || isBr(it);
                }, false);
            } else { // первая строка
                move = dataHash.find((it, i) => {
                    off--;
                    return off < 0 || isBr(it);
                });
            }
        }

        return move;
    }

    static moveDown(cursor, dataHash) {
        const cursorItem = dataHash.itemById(cursor);
        let next = isBr(cursorItem) ? cursorItem : dataHash.nearest(cursor, (it) => isBr(it), false);// след строка
        let move = false;
        if (next) {
            let first = false;
            let off = dataHash.delta(cursor, (it, i) => {
                first = (i === 0);
                return isBr(it) || first;
            });// кол-во до левого края
            if (first) {
                off++;
            }
            next = dataHash.next(next.id);

            if (next) {
                move = dataHash.find((it, i) => {
                    off--;
                    return (isBr(it) || off < 0 || i === (dataHash.data.length - 1));
                }, dataHash.index(next.id), 1);
            }
        }
        return move;
    }
}

export default CursorHandler;
