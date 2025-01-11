/* eslint-disable camelcase */
import React from 'react';
import get from '../../js/get';
import getid from '../../js/getid';

function Space({
    id,
    type,
    style = {},
    class: css = '',
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
        sender.stopPropagation();
    };

    return (
        <span
            id={id}
            style={{ ...style, color: '#00000000' }}
            className={`${cursor ? 'cursor ' : ''}${select ? 'select ' : ''}${css ? `${css} ` : ''}` }
            // className={`${cursor ? 'cursor' : ''}` }
            onMouseDown={doClick}
        >
        &nbsp;
        </span>
    );
}

Space.createData = (data = {}) => ({
    id: getid(),
    type: 'space',
    value: '&nbsp;',
    class: '',
    ...data,
    style: { ...get(data, ['style'], {}) },
});

Space.asText = () => ' ';

export default Space;
