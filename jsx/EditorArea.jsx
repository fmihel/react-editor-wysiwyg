/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, {
    Profiler, useCallback, useEffect, useRef, useState,
} from 'react';
import _ from 'lodash';
import array from './js/array.js';
import selected from './js/selected.js';
import eq from './js/eq.js';
import {
    KEY_CODE_A, KEY_CODE_BACKSPACE, KEY_CODE_C, KEY_CODE_DEL, KEY_CODE_DOWN, KEY_CODE_ENTER,
    KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, KEY_CODE_SPACE, KEY_CODE_V,
    isCharKey,
    KEY_CODE_HOME,
    KEY_CODE_END,
} from './js/consts.js';
import End, { ID, removeLastEnd } from './EditorTags/End/End.jsx';
import EditorTags from './EditorTags.jsx';
import scroll from './js/scroll.js';
import DOM from './js/DOM.js';
import Data from './Data/Data.js';
import EditorTagClass from './EditorTags/EditorTagClass.js';
import { isBr } from './EditorTags/Br/Br.jsx';
import eventListener from './js/eventListener.js';
import clipboard from './Data/clipboard.js';
import CursorHandler from './js/cursorHandler.js';

const buffer = {
    selects: [],
};

let _lockKey = false;

const lockKey = (handler) => {
    if (!_lockKey) {
        _lockKey = true;
        handler();
        setTimeout(() => { _lockKey = false; }, 0);
    }
};

function EditorArea({
    // list = test_list,
    data: outerData,
    selects: outerSelect = [],
    onChange = undefined,
    onSelected = undefined,
    onCursor = undefined,

}) {
    const ref = useRef();
    const [hash, setHash] = useState();
    const [data, setData] = useState([]);
    const [cursor, setCursor] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const [shiftSelect, setShiftSelect] = useState([]);
    const [mouseSelect, setMouseSelect] = useState(false);

    /** получаем выделеные блоки из стандартартного sыделения или имметированного shift */
    const getSelects = () => {
        const out = shiftSelect.length ? shiftSelect : selected.get_ids(data);
        if (out.length && out[out.length - 1] === ID) {
            out.pop();
        }

        return out;
    };

    const changeSelects = () => {
        if (onSelected) {
            const s = getSelects();
            if (!eq.array(s, buffer.selects)) {
                buffer.selects = [...s];
                onSelected(s);
            }
        }
    };
    const onMouseSelect = (o) => {
        if (o) {
            // setCursor(false);
            // setShowCursor(false);
            setShiftSelect([]);
        }
        setMouseSelect(!!o);
    };
    useEffect(() => {
        const newHash = Data.create();
        setHash(newHash);

        const remove = selected.on(onMouseSelect);
        return () => {
            remove();
            Data.free(newHash);
        };
    }, []);

    const onFocusIn = () => {
        // console.log('show');
        setShowCursor(true);
    };

    const onFocsuOut = () => {
        setShowCursor(false);
        // console.log('hide');
    };

    useEffect(() => {
        if (ref && ref.current) {
            const remove = eventListener(ref.current, 'focusout', onFocsuOut);
            return () => {
                remove();
            };
        }
    }, [ref]);

    useEffect(() => {
        if (outerSelect.length) {
            setShiftSelect(outerSelect);
        }
    }, [outerSelect]);

    useEffect(() => {
        changeSelects();
    }, [shiftSelect, cursor, mouseSelect, outerSelect]);

    useEffect(() => {
        if (hash) {
            setData(Data(hash).change(([...outerData, End.createData()])));
        }
    }, [outerData, hash]);

    useEffect(() => {
        // console.log({ cursor });
        if (onCursor) {
            onCursor({ cursor });
        }
        scrollToViewPortDelay();
    }, [cursor]);

    const doClickTag = useCallback((o) => {
        setCursor(mouseSelect ? false : o.id);
        setShiftSelect([]);

        // o.sender.stopPropagation();
        // o.preventDefault();
    }, [hash]);

    const doDoubleClick = () => {
        setCursor(false);
        setShiftSelect([]);
    };

    // const reposCursor = () => {
    //     if (cursor === false) {
    //         const last = data[data.length - 1];
    //         setCursor(last.id);
    //     }
    // };

    const doMouseDown = () => {
        ref.current.focus();
        if (shiftSelect.length) {
            setShiftSelect([]);
            setCursor(false);
        }
        if (cursor === false) {
            const last = data[data.length - 1];
            setCursor(last.id);
        }
    };

    const doChange = (newData) => {
        if (onChange) {
            onChange(Data(hash).change(removeLastEnd(newData)));
        } else {
            setData(Data(hash).change(newData));
        }
        scrollToViewPortDelay();
    };

    const doChangeTag = useCallback((o) => {
        doChange(Data(hash).map((it) => (eq.id(o.id, it.id) ? { ...it, ...o } : { ...it })));
    }, [hash]);

    const scrollToViewPort = () => {
        if (ref.current) {
            scroll.toViewPort(ref.current, DOM('.cursor', ref.current), { margin: 32 });
        }
    };

    const scrollToViewPortDelay = useCallback(_.throttle(scrollToViewPort, 100, { leading: false, trailing: true }), [ref]);

    const doKeyDown = (o) => {
        lockKey(() => {
            // console.log(o.key, o.keyCode, 'ctrl', o.ctrlKey, 'shift', o.shiftKey, selects_debug(selects));
            // console.log(o.key, o.keyCode);

            const dataHash = Data(hash);
            const index = dataHash.index(cursor);
            let no_handler = true;
            let clear_shift_select = true;

            if (cursor && !o.ctrlKey) {
                if (isCharKey(o.keyCode)) {
                    no_handler = false;

                    // вычисляем предыдущий э-т, для заимствования стиляs
                    const prev = index > 0 ? dataHash.nearest(data[index].id, ((it) => it.type === 'char')) : false;

                    doChange([
                        ...data.slice(0, index),
                        EditorTagClass.createData('char', {
                            value: o.key,
                            ...prev && prev.style ? { style: prev.style } : {},
                            ...prev && prev.class ? { class: prev.class } : {},
                        }),
                        ...data.slice(index)]);
                }
                if (o.keyCode === KEY_CODE_SPACE) {
                    no_handler = false;

                    doChange([
                        ...data.slice(0, index),
                        EditorTagClass.createData('space'),
                        ...data.slice(index)]);
                }
                if (o.keyCode === KEY_CODE_ENTER) { // enter
                    no_handler = false;
                    doChange([
                        ...data.slice(0, index),
                        EditorTagClass.createData('br'),
                        ...data.slice(index)]);
                }
            }

            if (o.ctrlKey) {
                no_handler = false;
                clear_shift_select = false;
                if (o.keyCode === KEY_CODE_C) {
                    const sel = getSelects().map((id) => dataHash.itemById(id));
                    console.log('sel', sel);
                    clipboard.writeData(sel);
                }
                if (o.keyCode === KEY_CODE_V && cursor) {
                    clear_shift_select = true;
                    clipboard.readData()
                        .then((newData) => {
                            const indexTo = dataHash.index(cursor);
                            doChange([
                                ...dataHash.slice(0, indexTo),
                                ...newData,
                                ...dataHash.slice(indexTo),
                            ]);
                        });
                }

                if (o.keyCode === KEY_CODE_A) {
                    clear_shift_select = true;
                    setShiftSelect(removeLastEnd(dataHash.map((it) => it.id)));
                }
            }

            if (o.keyCode === KEY_CODE_LEFT && cursor) { // to left
                no_handler = false;
                const prev = dataHash.prev(cursor);
                if (prev) {
                    setCursor(prev.id);
                }

                setShiftSelect(o.shiftKey ? CursorHandler.moveLeft(shiftSelect, cursor, prev, dataHash) : []);
            }

            if (o.keyCode === KEY_CODE_RIGHT) { // to right
                no_handler = false;
                const next = dataHash.next(cursor);

                if (next) {
                    setCursor(next.id);
                }

                setShiftSelect(o.shiftKey ? CursorHandler.moveRight(shiftSelect, cursor, next, dataHash) : []);
            }

            if (o.keyCode === KEY_CODE_HOME && cursor) { // to home
                no_handler = false;
                const left = dataHash.nearest(cursor, (it) => isBr(it));
                const to = left ? dataHash.next(left.id) : dataHash.first();

                setCursor(to ? to.id : false);
                setShiftSelect(o.shiftKey && to ? CursorHandler.moveLeft(shiftSelect, cursor, to, dataHash) : []);
            }

            if (o.keyCode === KEY_CODE_END && cursor) { // to end
                no_handler = false;
                if (!isBr(dataHash.itemById(cursor))) {
                    const right = dataHash.nearest(cursor, (it) => isBr(it), false) || dataHash.last();

                    setCursor(right ? right.id : false);
                    setShiftSelect(o.shiftKey && right ? CursorHandler.moveRight(shiftSelect, cursor, right, dataHash) : []);
                }
            }

            if (o.keyCode === KEY_CODE_UP && cursor) { // to up
                no_handler = false;

                // let move = dataHash.first();
                let next = dataHash.nearest(cursor, (it) => isBr(it));// начало текущей строки строки
                let move = false;
                if (next) {
                    let off = dataHash.delta(cursor, (it) => isBr(it));// кол-во до левого края
                    let is_first_line = false;
                    next = dataHash.nearest(next.id, (it, i) => {
                        is_first_line = (i === 0);
                        return isBr(it) || i === 0;
                    });// начало пред предыдущей строки
                    if (next) {
                        next = dataHash.next(next.id);
                        off = is_first_line ? off - 1 : off;
                        move = dataHash.find((it) => {
                            off--;
                            return (isBr(it) || off < 0);
                        }, dataHash.index(next.id), 1);
                        if (move) {
                            setCursor(move.id);
                        }
                    }
                }
                setShiftSelect(o.shiftKey ? CursorHandler.moveLeft(shiftSelect, cursor, move, dataHash) : []);
            }

            if (o.keyCode === KEY_CODE_DOWN && cursor) { // to down
                no_handler = false;

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
                            return (isBr(it) || off < 0 || i === (data.length - 1));
                        }, dataHash.index(next.id), 1);

                        if (move) {
                            setCursor(move.id);
                        }
                    }
                }

                setShiftSelect(o.shiftKey ? CursorHandler.moveRight(shiftSelect, cursor, move, dataHash) : []);
            }

            if (o.keyCode === KEY_CODE_BACKSPACE) { // backspace
                no_handler = false;
                const sel = getSelects();
                if (sel.length) {
                    const next = dataHash.next(sel[sel.length - 1]);

                    doChange(dataHash.filter((it) => !sel.find((sid) => eq.id(it.id, sid))));
                    setShiftSelect([]);
                    setCursor(next ? next.id : 0);
                } else {
                    const prev = dataHash.prev(cursor);
                    // console.log({ prev });
                    doChange(dataHash.filter((it) => !eq.id(it.id, prev.id)));
                }
            }

            if (o.keyCode === KEY_CODE_DEL) { // delete
                no_handler = false;
                const sel = getSelects();
                if (sel.length) {
                    const next = dataHash.next(sel[sel.length - 1]);

                    doChange(dataHash.filter((it) => !sel.find((sid) => eq.id(it.id, sid))));
                    setShiftSelect([]);
                    setCursor(next ? next.id : 0);
                } else {
                    const next = dataHash.next(cursor);
                    doChange(dataHash.filter((it) => !eq.id(it.id, cursor)));
                    setCursor(next ? next.id : 0);
                }
            }

            if (no_handler) {
                // console.log('no handler');
            }
            if (clear_shift_select) {
                setShowCursor(true);
                selected.clear();
            }
        });
        // o.stopPropagation();
        o.preventDefault();
        return false;
    };

    // const checkRender = (id, // проп "id" из дерева компонента Profiler, для которого было зафиксировано изменение
    //     phase, // либо "mount" (если дерево было смонтировано), либо "update" (если дерево было повторно отрендерено)
    //     actualDuration, // время, затраченное на рендер зафиксированного обновления
    //     baseDuration, // предполагаемое время рендера всего поддерева без кеширования
    //     startTime, // когда React начал рендерить это обновление
    //     commitTime, // когда React зафиксировал это обновление
    //     interactions, // Множество «взаимодействий» для данного обновления
    // ) => {
    //     // console.log('---------------------------');
    //     console.log('phase', phase, 'all', actualDuration.toFixed(2), 'base', baseDuration.toFixed(2));
    // };
    return (
        <>
            {/* <Profiler id='area' onRender={checkRender}> */}
            <div
                className='editor-area'
                tabIndex={0}
                onMouseDown={doMouseDown}
                // onMouseUp={doMouseUp}
                // onMouseMove={doMouseMove}
                onKeyDown={doKeyDown}
                onDoubleClick={doDoubleClick}
                // onBlur={onFocusIn}
                onFocus={onFocusIn}
                ref={ref}
            >
                <EditorTags
                    data={data}
                    cursor={cursor}
                    showCursor={showCursor}
                    selects={shiftSelect}
                    doClickTag={doClickTag}
                    doChangeTag={doChangeTag}
                />
            </div>
            {/* </Profiler> */}
        </>
    );
}

export default EditorArea;
