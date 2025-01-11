import React, { memo } from 'react';
import EditorTagClass from './EditorTagClass';

const EditorTag = memo(({
    id, type, cursor, select, onClick, ...prop
}) =>
    // useEffect(() => {
    //     console.log('+');
    // });
    (EditorTagClass.get(type)({
        id,
        type,
        cursor,
        select,
        onClick,
        ...prop,
    })));

export default EditorTag;
