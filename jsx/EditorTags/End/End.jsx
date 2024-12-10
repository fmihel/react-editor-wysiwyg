import React from 'react';
import eq from '../../../_js/eq';

const ID = 'end';
function End({
    id,
    cursor = false,
}) {
    return (
        <span
            id={id}
            className={`${cursor ? 'cursor' : ''}` }
        />
    );
}

End.createData = (data = {}) => ({
    id: ID,
    type: 'end',
    ...data,
});

export default End;

const isNotEnd = (item) => !eq.id(item.id, ID);
export {
    isNotEnd,
};
