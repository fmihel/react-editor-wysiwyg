/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import React, {
    useCallback, useState,
} from 'react';
import _ from 'lodash';
import Style from '../../utils/Style.js';
import eq from '../../_js/eq.js';
import EditorTags from '../EditorTags/EditorTags.jsx';
import Data from '../../_js/Data.js';
import dialog from '../EditorDialog/dialog.js';
import ImgProp from '../EditorTags/Img/Prop.jsx';
import UrlProp from '../EditorTags/A/Prop.jsx';

function EditorPanel({
    data,
    selects,
    onChange,
    cursor,
    onSelect,
}) {
    const [fontSize, setFontSize] = useState(1);

    const change = (newData) => {
        if (onChange) {
            onChange(newData);
        }
    };
    const fixFocus = () => {
        if (onSelect) {
            onSelect([...selects]);
        }
    };
    const changeStyle = (modif) => {
        if (onChange) {
            let define;

            const newData = data.map((it) => {
                if (selects.find((sid) => eq.id(it.id, sid))) {
                    define = define || modif(it.style || {});
                    return {
                        ...it,
                        style: {
                            ...it.style,
                            ...define,
                        },
                    };
                }
                return { ...it };
            });

            onChange(newData);
        }
    };
    const bold = () => {
        changeStyle((style) => Style.toggle({ fontWeight: ['bold', ''] }, style));
    };

    const underline = () => {
        changeStyle((style) => Style.toggle({ textDecoration: ['underline', ''] }, style));
    };

    const italic = () => {
        changeStyle((style) => Style.toggle({ fontStyle: ['italic', ''] }, style));
    };

    const color = (value) => {
        changeStyle(() => ({ color: value }));
    };

    const colorDelay = useCallback(_.debounce(color, 1000), [data, selects]);

    const changeColor = (o) => {
        colorDelay(o.target.value);
    };
    const changeFontSize = (o) => {
        fixFocus();
        setFontSize(o.target.value);
        changeStyle(() => ({ fontSize: `${o.target.value}rem` }));
    };
    const doFocus = () => {
        fixFocus();
    };

    const image = () => {
        dialog({
            Prop: ImgProp,
            data: { src: '' },
        })
            .then(({ result, btn }) => {
                if (btn === 'ok') {
                    change(
                        Data.insert(
                            data,
                            [EditorTags.createData('img', result)],
                            cursor,
                        ),
                    );
                }
            });
    };

    const url = () => {
        dialog({
            Prop: UrlProp,
            data: { href: '', value: '' },
        })
            .then(({ result, btn }) => {
                if (btn === 'ok') {
                    change(
                        Data.insert(
                            data,
                            [EditorTags.createData('a', result)],
                            cursor,
                        ),
                    );
                }
            });
    };

    return (
        <>
            <div>
                <button onClick={bold}>{'B'}</button>
                <button onClick={underline}>{'U'}</button>
                <button onClick={italic}>{'I'}</button>
                {/* <button onClick={show}>dlg</button> */}
                <input type="color" id="head" name="head" value="#000000" onChange={changeColor}/>
                <button onClick={image}>{'img'}</button>
                <button onClick={url}>{'url'}</button>
                <input type='number' min={0.5} max={4} step={0.1} value={fontSize} onChange={changeFontSize} onFocus={doFocus}/>

            </div>
        </>
    );
}

export default EditorPanel;
