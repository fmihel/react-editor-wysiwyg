import React from 'react';
import EditorTagClass from './EditorTagClass';

const EditorTag = ({
    id, type, cursor, select, onClick, ...prop
}) => EditorTagClass.get(type)({
    id,
    type,
    cursor,
    select,
    onClick,
    ...prop,
});

export default EditorTag;
