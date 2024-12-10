/* eslint-disable camelcase */
import React from 'react';
import get from '../../../_js/get.js';
import random_str from '../../../_js/random_str.js';
import dialog from '../../EditorDialog/dialog.js';
import Prop from './Prop.jsx';

function A({
    id,
    type,
    value,
    href,
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
                id, type, href, value, ...o,
            });
        }
    };

    const doDoubleClick = (o) => {
        dialog({ Prop, data: { href, value } })
            .then(({ result, btn }) => {
                if (btn === 'ok') {
                    change(result);
                }
            });
        o.stopPropagation();
    };
    return (
        <span
            id={id}
            style={{ ...style }}
            className={`${cursor ? 'cursor' : ''} ${select ? 'select' : ''}` }
            onMouseDown={doClick}
            onDoubleClick={doDoubleClick}
        >
            {value}
        </span>
    );
}

A.createData = (data = {}) => ({
    id: random_str(3),
    type: 'a',

    value: '',
    href: '',
    ...data,
    style: { ...get(data, ['style'], {}) },

});

export default A;
