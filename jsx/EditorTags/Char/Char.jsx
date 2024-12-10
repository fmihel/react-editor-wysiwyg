/* eslint-disable camelcase */
import React from 'react';
import get from '../../common/get';
import random_str from '../../common/random_str';

function Char({
    id,
    type,
    value,
    style = {},
    cursor = false,
    select = false,
    onClick,
}) {
    const doClick = (sender) => {
        if (onClick) {
            onClick({
                id, type, value, sender,
            });
        }
    };

    return (
        <span
            id={id}
            style={{ ...style }}
            className={`${cursor ? 'cursor' : ''} ${select ? 'select' : ''}` }
            // className={`${cursor ? 'cursor' : ''}` }
            onMouseDown={doClick}
        >
            {value}
        </span>
    );
}

Char.createData = (data = {}) => ({
    id: random_str(3),
    type: 'char',

    value: '',
    ...data,
    style: { ...get(data, ['style'], {}) },
});

export default Char;
