import DOM from './DOM';
import abs from './abs';

/** скролинг DOM элементов */
class scroll {
    static private = {
        story: {},
    };

    /** возвращает значение скролинга объекта или -1
     *  @param {string || DOM} селектор или объект DOM
     *  @returns {int} величина скролинга или -1 если не найден DOMs
    */
    static get(outer) {
        const dom = DOM(outer);

        return {
            y: dom ? dom.scrollTop : -1,
            x: dom ? dom.scrollLeft : -1,
        };
    }

    /** скролирует элемент до значения value
     *  @param {string || DOM} селектор или объект DOM
     *  @param {int} величина скролинга
    */
    static top(domOrSelector, top) {
        const dom = DOM(domOrSelector);
        if (dom) {
            dom.scrollTop = top;
        }
    }

    static left(domOrSelector, left) {
        const dom = DOM(domOrSelector);
        if (dom) {
            dom.scrollLeft = left;
        }
    }

    /** скролирует объект outer до момента, пока inner не окажется в области видимости */
    static toViewPort(outer, inner, param = {}) {
        const a = {
            off: 0,
            narrow: 0,
            margin: 0,
            ...param,
        };
        let result = false;
        const outerDOM = DOM(outer);
        const innerDOM = DOM(inner);

        if (outerDOM && innerDOM) {
            const margin = typeof a.margin === 'object' ? {
                left: 0, top: 0, right: 0, bottom: 0, ...a.margin,
            } : {
                left: a.margin, right: a.margin, top: a.margin, bottom: a.margin,
            };
            const posInner = abs(innerDOM);
            const posOuter = abs(outerDOM);

            posOuter.y += margin.top;
            posOuter.h -= (margin.bottom + margin.top);
            let current;

            if (posInner.y < posOuter.y || posInner.y > (posOuter.y + posOuter.h - a.narrow)) {
                current = scroll.get(outerDOM);
                const top = posInner.y - posOuter.y + current.y - a.off;
                scroll.top(outerDOM, top);
                result = true;
            }

            posOuter.x += margin.left;
            posOuter.w -= (margin.right + margin.left);

            if (posInner.x < posOuter.x || posInner.x > (posOuter.x + posOuter.w - a.narrow)) {
                current = !current ? scroll.get(outerDOM) : current;
                const left = posInner.x - posOuter.x + current.x - a.off;
                scroll.left(outerDOM, left);
                result = true;
            }
        }
        return result;
    }

    /** возвращает объект с признаками наличия/отсутствия горизонтальной и вертикальной полосы прокрутки
     * @param {object} DOM object
     * @return {vert:<bool>,horiz:<bool>}
     *
    */
    static haveScrollBar(dom) {
        return {
            horiz: dom.scrollWidth > dom.clientWidth,
            vert: dom.scrollHeight > dom.clientHeight,
        };
    }
}

export default scroll;
