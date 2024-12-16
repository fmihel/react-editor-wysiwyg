/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import React, {
    useCallback, useState,
} from 'react';
import _ from 'lodash';
import Style from '../utils/Style.js';
import eq from './js/eq.js';
import EditorTags from './EditorTags.jsx';
import Data from './js/Data.js';
import dialog from './EditorDialog.jsx';
import ImgProp from './EditorTags/Img/Prop.jsx';
import UrlProp from './EditorTags/A/Prop.jsx';
import scroll from './js/scroll.js';

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

    const color = (name, value) => {
        changeStyle(() => ({ [name]: value }));
    };

    const colorDelay = useCallback(_.debounce(color, 1000), [data, selects]);

    const changeColor = (o) => {
        colorDelay('color', o.target.value);
    };

    const changeFone = (o) => {
        colorDelay('background', o.target.value);
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
        dialog.open({
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
        dialog.open({
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

    const doScroll = () => {
        scroll.toViewPort('.editor-area', '.cursor');
    };
    return (
        <>
            <div className='editor-panel'>
                <button onClick={bold} className="icon-bold"></button>
                <button onClick={underline} className="icon-underline"></button>
                <button onClick={italic} className="icon-italic"></button>
                <input type="color" id="color" name="color" value="#000000" onChange={changeColor}/>
                <input type="color" id="fone" name="fone" value="#000000" onChange={changeFone}/>
                <button onClick={image} className="icon-img"></button>
                <button onClick={url} className="icon-link"></button>
                <button onClick={doScroll} >s</button>
                <input type='number' min={0.5} max={4} step={0.1} value={fontSize} onChange={changeFontSize} onFocus={doFocus}/>

            </div>
        </>
    );
}

export default EditorPanel;
