import React, { memo, useEffect } from 'react';
import EditorTagClass from './EditorTagClass';

const EditorTag = memo(({
    id, type, cursor, select, onClick, ...prop
}) => {
    useEffect(() => {
        console.log('+');
    });
    return (EditorTagClass.get(type)({
        id,
        type,
        cursor,
        select,
        onClick,
        ...prop,
    }));
});

export default EditorTag;
