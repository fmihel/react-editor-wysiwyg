/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import array from './js/array.js';
import selected from './js/selected.js';
import Data from './js/Data.js';
import eq from './js/eq.js';
import {
    KEY_CODE_A, KEY_CODE_BACKSPACE, KEY_CODE_C, KEY_CODE_DEL, KEY_CODE_DOWN, KEY_CODE_ENTER,
    KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, KEY_CODE_SPACE, KEY_CODE_V,
    isCharKey,
} from './js/consts.js';
import End, { ID } from './EditorTags/End/End.jsx';
import EditorTags from './EditorTags.jsx';
import Html from '../utils/Html.js';
import HtmlSpecialChars, { CR_CHAR, CR_HTML } from './js/HtmlSpecialChars.js';
import scroll from './js/scroll.js';

const buffer = {
    selects: [],
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

    /** получаем выделеные блоки из стандартартного выделения или имметированного shift */
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
        const remove = selected.on((o) => {
            if (o) {
                setCursor(false);
                setShiftSelect([]);
            }
            setMouseSelect(!!o);
        });
        return () => { remove(); };
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
        setData([...outerData, End.createData()]);
    }, [outerData]);

    useEffect(() => {
        if (onCursor) {
            onCursor({ cursor });
        }
    }, [cursor]);

    const doClickTag = (o) => {
        setCursor(mouseSelect ? false : o.id);
        setShiftSelect([]);

        // o.sender.stopPropagation();
        // o.preventDefault();
    };

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
            reposCursor();
        }
    };

    const doMouseUp = () => {
    };

    const doMouseMove = () => {
    };

    const doChange = (newData) => {
        if (onChange) {
            onChange(newData.filter((it) => it.id !== 'end'));
        } else {
            setData(newData);
        }
    };

    const doKeyDown = (o) => {
        // console.log(o.key, o.keyCode, 'ctrl', o.ctrlKey, 'shift', o.shiftKey, selects_debug(selects));
        // console.log(o.key, o.keyCode);
        const index = data.findIndex((it) => it.id === cursor);
        let no_handler = true;

        // const symbols = [KEY_CODE_SPACE];
        if (cursor && !o.ctrlKey) {
            if (isCharKey(o.keyCode)) {
                no_handler = false;

                doChange([
                    ...data.slice(0, index),
                    EditorTags.createData('char', { value: o.key }),
                    ...data.slice(index)]);
            }
            if (o.keyCode === KEY_CODE_SPACE) {
                no_handler = false;

                doChange([
                    ...data.slice(0, index),
                    EditorTags.createData('space'),
                    ...data.slice(index)]);
            }
        }
        if (o.ctrlKey) {
            no_handler = false;

            if (o.keyCode === KEY_CODE_C) {
                // setCopy(getSelects());
                navigator.clipboard.writeText(Data.asArray(getSelectsObjects(), (it) => it.value).join(''));
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

                        doChange(Data.insert(data, newData, cursor));
                    });
            }

            if (o.keyCode === KEY_CODE_A) {
                setShiftSelect(Data.ids(data).filter((it) => it.id !== 'end'));
            }
        }

        if (o.keyCode === KEY_CODE_ENTER) { // enter
            no_handler = false;
            doChange([
                ...data.slice(0, index),
                EditorTags.createData('br'),
                ...data.slice(index)]);
        }

        if (o.keyCode === KEY_CODE_LEFT) { // to left
            no_handler = false;
            const prev = Data.prev(data, (it) => eq.id(it.id, cursor));
            if (prev) {
                setCursor(prev.id);
            }
            setShiftSelect(o.shiftKey ? array.addUnique(shiftSelect, prev.id) : []);
        }

        if (o.keyCode === KEY_CODE_RIGHT) { // to right
            no_handler = false;
            const next = Data.next(data, (it) => eq.id(it.id, cursor));
            if (next) {
                setCursor(next.id);
            }
            setShiftSelect(o.shiftKey ? array.addUnique(shiftSelect, cursor) : []);
        }

        if (o.keyCode === KEY_CODE_UP) { // to up
            no_handler = false;
            const up = Data.nearest(data, (it) => eq.id(it.id, cursor), (it) => it.type === 'br');
            setShiftSelect([]);
            setCursor(up ? up.id : (data.length ? data[0].id : 0));
        }

        if (o.keyCode === KEY_CODE_DOWN) { // to down
            no_handler = false;
            const down = Data.nearest(data, (it) => eq.id(it.id, cursor), (it) => it.type === 'br', false);
            setShiftSelect([]);
            setCursor(down ? down.id : (data.length ? data[data.length - 1].id : 0));
        }

        if (o.keyCode === KEY_CODE_BACKSPACE) { // backspace
            no_handler = false;
            const sel = getSelects();
            if (sel.length) {
                const next = Data.next(data, (it) => eq.id(it.id, sel[sel.length - 1]));

                doChange(data.filter((it) => !sel.find((sid) => eq.id(it.id, sid))));
                setShiftSelect([]);
                setCursor(next ? next.id : 0);
            } else {
                const prev = Data.prev(data, (it) => eq.id(it.id, cursor));
                // console.log({ prev });
                doChange(data.filter((it) => !eq.id(it.id, prev.id)));
            }
        }

        if (o.keyCode === KEY_CODE_DEL) { // delete
            no_handler = false;
            const sel = getSelects();
            if (sel.length) {
                const next = Data.next(data, (it) => eq.id(it.id, sel[sel.length - 1]));

                doChange(data.filter((it) => !sel.find((sid) => eq.id(it.id, sid))));
                setShiftSelect([]);
                setCursor(next ? next.id : 0);
            } else {
                const next = Data.next(data, (it) => eq.id(it.id, cursor));
                doChange(data.filter((it) => !eq.id(it.id, cursor)));
                setCursor(next ? next.id : 0);
            }
        }

        // if ([KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_UP, KEY_CODE_DOWN,KEY_].indexOf(o.keyCode) > -1 || isCharKey(o.keyCode)) {
        const scr = scroll.toViewPort('.editor-area', '.cursor', { margin: 32 });
        if (scr) console.log({ scr });
        // }
        if (no_handler) {
            console.log('no handler');
        }
        // o.stopPropagation();
        o.preventDefault();
        return false;
    };

    const doChangeTag = (o) => {
        doChange(data.map((it) => (eq.id(o.id, it.id) ? { ...it, ...o } : { ...it })));
    };
    return (
        <>
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
                {data.map(({
                    id, type, Com, ...prop
                }) => <EditorTags
                    key={id}
                    id={id}
                    type={type}
                    cursor= {id === cursor && showCursor}
                    // cursor= {id === cursor}
                    select={shiftSelect.indexOf(id) > -1}
                    {...prop}
                    onClick={ doClickTag}
                    onChange={doChangeTag}
                />)}
            </div>
        </>
    );
}

export default EditorArea;
