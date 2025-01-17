import React from 'react';
import eq from '../../js/eq';

export const ID = 'end';
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
    id: ID,
    type: 'end',
    ...data,
});

export default End;

const isEnd = (item) => eq.id(item.id, ID);
const removeLastEnd = (list) => {
    const out = [...list];
    if (out.length) {
        const last = out[out.length - 1];
        if (last === ID || (typeof (last) === 'object' && last.type === ID)) {
            out.pop();
        }
    }
    return out;
};
export {
    isEnd,
    removeLastEnd,
};
