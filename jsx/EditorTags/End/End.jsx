import React from 'react';
import eq from '../../js/eq';

export const ID_END = 'end';
function End({
    id,
    cursor = false,
    onClick,
}) {
    const doClick = (sender) => {
        if (onClick) {
            onClick({
                id,
            });
        }
    };
    return (
        <span
            id={id}
            className={`end-tag${(cursor ? ' cursor' : '')}` }
            onMouseDown={doClick}
        >
            &nbsp;
        </span>
    );
}

End.createData = (data = {}) => ({
    id: ID_END,
    type: 'end',
    ...data,
});

export default End;

const isEnd = (item) => eq.id(item.id, ID_END);
const removeLastEnd = (list) => {
    const out = [...list];
    if (out.length) {
        const last = out[out.length - 1];
        if (last === ID_END || (typeof (last) === 'object' && last.type === ID_END)) {
            out.pop();
        }
    }
    return out;
};
export {
    isEnd,
    removeLastEnd,
};
