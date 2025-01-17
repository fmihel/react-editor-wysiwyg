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
}

export default CursorHandler;
