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
import Html from '../utils/Html.js';
import HtmlSpecialChars, { CR_CHAR, CR_HTML } from './js/HtmlSpecialChars.js';
import scroll from './js/scroll.js';
import DOM from './js/DOM.js';
import DataHash from './DataHash/DataHash.js';
import EditorTagClass from './EditorTags/EditorTagClass.js';
import { isBr } from './EditorTags/Br/Br.jsx';

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

    // const [copy, setCopy] = useState([]);
    // let copy = [];
    // const setCopy = (newCopy) => {
    //     copy = [...newCopy];
    // };
    // let useOuterSelect = false;

    /** получаем выделеные блоки из стандартартного sыделения или имметированного shift */
    const getSelects = () => {
        const out = shiftSelect.length ? shiftSelect : selected.get_ids(data);
        if (out.length && out[out.length - 1] === ID) {
            out.pop();
        }

        return out;
    };

    const getSelectsObjects = () => {
        const s = getSelects();
        return data.filter((it) => s.indexOf(it.id) > -1);
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

    useEffect(() => {
        const newHash = DataHash.create();
        setHash(newHash);

        const remove = selected.on((o) => {
            if (o) {
                setCursor(false);
                setShiftSelect([]);
            }
            setMouseSelect(!!o);
        });
        return () => {
            remove();
            DataHash.free(newHash);
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
        if (ref) {
            ref.current.addEventListener('focusout', onFocsuOut);
            return () => {
                ref.current.removeEventListener('focusout', onFocsuOut);
            };
        }
    }, [ref]);

    useEffect(() => {
        if (outerSelect.length) {
            setShiftSelect(outerSelect);
        }
        // useOuterSelect = !!outerSelect.length;
    }, [outerSelect]);

    useEffect(() => {
        // setShowCursor(shiftSelect.length || mouseSelect.length || outerSelect.length);
        changeSelects();
    }, [shiftSelect, cursor, mouseSelect, outerSelect]);

    useEffect(() => {
        if (hash) {
            setData(DataHash.data(hash).change(([...outerData, End.createData()])));
        }
    }, [outerData, hash]);

    useEffect(() => {
        if (onCursor) {
            onCursor({ cursor });
        }
        scrollToViewPort();
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

    const reposCursor = () => {
        if (cursor === false) {
            const last = data[data.length - 1];
            setCursor(last.id);
        }
    };

    const doMouseDown = () => {
        ref.current.focus();
        if (shiftSelect.length) {
            setShiftSelect([]);
            setCursor(false);
        } else {
            // reposCursor();
        }
    };

    const doMouseUp = () => {
    };

    const doMouseMove = () => {
    };

    const doChange = (newData) => {
        if (onChange) {
            onChange(DataHash.data(hash).change(removeLastEnd(newData)));
        } else {
            setData(DataHash.data(hash).change(newData));
        }
    };

    const doChangeTag = useCallback((o) => {
        doChange(DataHash.data(hash).map((it) => (eq.id(o.id, it.id) ? { ...it, ...o } : { ...it })));
    }, [hash]);

    const scrollToViewPort = () => {
        if (cursor && ref.current) {
            scroll.toViewPort(ref.current, DOM(`#${cursor}`), { margin: 32 });
        }
    };
    const doKeyDown = (o) => {
        lockKey(() => {
            // console.log(o.key, o.keyCode, 'ctrl', o.ctrlKey, 'shift', o.shiftKey, selects_debug(selects));
            // console.log(o.key, o.keyCode);

            const wrap = DataHash.data(hash);
            const index = wrap.index(cursor);
            let no_handler = true;

            if (cursor && !o.ctrlKey) {
                if (isCharKey(o.keyCode)) {
                    no_handler = false;
                    doChange([
                        ...data.slice(0, index),
                        EditorTagClass.createData('char', { value: o.key }),
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

                if (o.keyCode === KEY_CODE_C) {
                // setCopy(getSelects());
                    // navigator.clipboard.writeText(Data.asArray(getSelectsObjects(), (it) => it.value).join(''));
                    navigator.clipboard.writeText(getSelects().map((id) => wrap.itemById(id).value).join(''));
                }
                if (o.keyCode === KEY_CODE_V && cursor) {
                    navigator.clipboard
                        .readText()
                        .then((clipText) => {
                            const newData = Html.toData(HtmlSpecialChars.shield(clipText).replaceAll(CR_CHAR, CR_HTML))
                                .map((it) => ({
                                    ...it,
                                    ...it.value ? { value: HtmlSpecialChars.unShield(it.value) } : {},
                                }));
                            const indexTo = wrap.index(cursor);
                            doChange([
                                ...wrap.slice(0, indexTo),
                                ...newData,
                                ...wrap.slice(indexTo),
                            ]);
                            // doChange(wrap.insert(data, newData, cursor));
                        });
                }

                if (o.keyCode === KEY_CODE_A) {
                    setShiftSelect(removeLastEnd(wrap.map((it) => it.id)));
                }
            }

            if (o.keyCode === KEY_CODE_LEFT && cursor) { // to left
                no_handler = false;
                const prev = wrap.prev(cursor);
                if (prev) {
                    setCursor(prev.id);
                }
                setShiftSelect(o.shiftKey ? array.addUnique(shiftSelect, prev.id) : []);
            }

            if (o.keyCode === KEY_CODE_RIGHT) { // to right
                no_handler = false;
                const next = wrap.next(cursor);
                if (next) {
                    setCursor(next.id);
                }
                setShiftSelect(o.shiftKey ? array.addUnique(shiftSelect, cursor) : []);
            }

            if (o.keyCode === KEY_CODE_HOME && cursor) { // to home
                no_handler = false;
                const left = wrap.nearest(cursor, (it) => isBr(it));
                const to = left ? wrap.next(left.id) : wrap.first();

                setShiftSelect([]);
                setCursor(to ? to.id : false);
            }

            if (o.keyCode === KEY_CODE_END && cursor) { // to end
                no_handler = false;
                if (!isBr(wrap.itemById(cursor))) {
                    const right = wrap.nearest(cursor, (it) => isBr(it), false) || wrap.last();
                    setShiftSelect([]);
                    setCursor(right ? right.id : false);
                }
            }

            if (o.keyCode === KEY_CODE_UP && cursor) { // to up
                no_handler = false;

                let move = wrap.first();
                let next = wrap.nearest(cursor, (it) => isBr(it));// начало текущей строки строки
                if (next) {
                    let off = wrap.delta(cursor, (it) => isBr(it));// кол-во до левого края
                    next = wrap.nearest(next.id, (it) => isBr(it));// начало предыдущей строки
                    if (!next) {
                        next = wrap.first();
                        off--;
                    }
                    if (next) {
                        next = wrap.next(next.id);
                        move = wrap.find((it) => {
                            off--;
                            return (isBr(it) || off < 0);
                        }, wrap.index(next.id), 1);
                    }
                }
                setCursor(move ? move.id : false);
                setShiftSelect([]);
            }

            if (o.keyCode === KEY_CODE_DOWN && cursor) { // to down
                no_handler = false;

                let move = wrap.last(-1);
                const cursorItem = wrap.itemById(cursor);
                let next = isBr(cursorItem) ? cursorItem : wrap.nearest(cursor, (it) => isBr(it), false);// след строка
                if (next) {
                    let first = false;
                    let off = wrap.delta(cursor, (it, i) => {
                        first = (i === 0);
                        return isBr(it) || first;
                    });// кол-во до левого края
                    if (first) {
                        off++;
                    }
                    next = wrap.next(next.id);

                    if (next) {
                        move = wrap.find((it) => {
                            off--;
                            return (isBr(it) || off < 0);
                        }, wrap.index(next.id), 1) || wrap.last(0);
                    }
                }

                setCursor(move ? move.id : false);
                setShiftSelect([]);

                // const down = wrap.nearest(cursor, (it) => isBr(it), false) || wrap.last();

                // setShiftSelect([]);
                // setCursor(down ? down.id : false);
            }

            if (o.keyCode === KEY_CODE_BACKSPACE) { // backspace
                no_handler = false;
                const sel = getSelects();
                if (sel.length) {
                    const next = wrap.next(sel[sel.length - 1]);

                    doChange(wrap.filter((it) => !sel.find((sid) => eq.id(it.id, sid))));
                    setShiftSelect([]);
                    setCursor(next ? next.id : 0);
                } else {
                    const prev = wrap.prev(cursor);
                    // console.log({ prev });
                    doChange(wrap.filter((it) => !eq.id(it.id, prev.id)));
                }
            }

            if (o.keyCode === KEY_CODE_DEL) { // delete
                no_handler = false;
                const sel = getSelects();
                if (sel.length) {
                    const next = wrap.next(sel[sel.length - 1]);

                    doChange(wrap.filter((it) => !sel.find((sid) => eq.id(it.id, sid))));
                    setShiftSelect([]);
                    setCursor(next ? next.id : 0);
                } else {
                    const next = wrap.next(cursor);
                    doChange(wrap.filter((it) => !eq.id(it.id, cursor)));
                    setCursor(next ? next.id : 0);
                }
            }

            // if ([KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, KEY_CODE_DOWN,KEY_].indexOf(o.keyCode) > -1 || isCharKey(o.keyCode)) {
            // scroll.toViewPort('.editor-area', '.cursor', { margin: 32 });
            // if (scr) console.log({ scr });
            // }
            if (no_handler) {
                console.log('no handler');
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
                onMouseUp={doMouseUp}
                onMouseMove={doMouseMove}
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
