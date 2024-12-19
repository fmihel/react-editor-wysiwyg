import React, { memo } from 'react';
import EditorTag from './EditorTags/EditorTag.jsx';

const EditorTags = memo(({
    data,
    cursor,
    showCursor,
    selects,
    doClickTag,
    doChangeTag,
}) => (
    <>
        {data.map(({
            id, type, Com, ...prop
        }) => <EditorTag
            key={id}
            id={id}
            type={type}
            cursor= {id === cursor && showCursor}
            // cursor= {id === cursor}
            select={selects.indexOf(id) > -1}
            {...prop}
            onClick={ doClickTag}
            onChange={doChangeTag}
        />)}

    </>
));

export default EditorTags;
