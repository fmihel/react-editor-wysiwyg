/* eslint-disable camelcase */
import React from 'react';
import get from '../../js/get';
import random_str from '../../js/random_str';

function Space({
    id,
    type,
    style = {},
    cursor = false,
    select = false,
    onClick,
}) {
    const doClick = (sender) => {
        if (onClick) {
            onClick({
                id, type, sender,
            });
        }
    };

    return (
        <span
            id={id}
            style={{ ...style, color: '#00000000' }}
            className={`${cursor ? 'cursor' : ''} ${select ? 'select' : ''}` }
            // className={`${cursor ? 'cursor' : ''}` }
            onMouseDown={doClick}
        >
        &nbsp;
        </span>
    );
}

Space.createData = (data = {}) => ({
    id: random_str(3),
    type: 'space',
    value: '&nbsp;',
    ...data,
    style: { ...get(data, ['style'], {}) },
});

export default Space;
