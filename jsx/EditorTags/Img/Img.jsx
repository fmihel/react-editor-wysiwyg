/* eslint-disable camelcase */
import React from 'react';
import random_str from '../../js/random_str.js';
import get from '../../js/get.js';
import Prop from './Prop.jsx';
import dialog from '../../EditorDialog.jsx';

function Img({
    id,
    type,
    alt,
    src,
    style,
    select,
    cursor,
    onClick,
    onChange,
}) {
    const doClick = (sender) => {
        if (onClick) {
            onClick({ id, type, sender });
        }
    };
    const change = (o) => {
        if (onChange) {
            onChange({
                id, type, alt, src, ...o,
            });
        }
    };
    const onDoubleClick = (o) => {
        dialog.open({ Prop, data: { src } })
            .then(({ result, btn }) => {
                if (btn === 'ok') {
                    change(result);
                }
            });
        o.stopPropagation();
        // o.preventDefault();
    };
    return (
        <>
            <img
                id={id}
                alt={alt}
                style={{ ...style }}
                className={`${cursor ? 'cursor' : ''} ${select ? 'select' : ''}` }
                onMouseDown={doClick}
                onDoubleClick={onDoubleClick}
                src={src}
            />
        </>
    );
}

Img.createData = (data = {}) => ({
    id: random_str(3),
    type: 'img',

    alt: '',
    src: '',
    ...data,
    style: { ...get(data, ['style'], { width: 64, height: 64 }) },

});

export default Img;
