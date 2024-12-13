import React, {
    useState, Children, cloneElement, useEffect, useReducer,
} from 'react';
import EditorPanel from './EditorPanel.jsx';
import EditorArea from './EditorArea.jsx';
import demoData from './js/demoData.js';
// import Dialog from './Dialog.jsx';
// import dialog from './EditorDialog/dialog.js';
// import reducer from './EditorDialog/reducer.js';
// import { DIALOG_ID } from './EditorDialog/consts.js';
import EditorDialog from './EditorDialog.jsx';

function Editor({
    data = demoData,
    onChange,
    children,
}) {
    const [selects, setSelects] = useState([]);
    const [outerSelects, setOuterSelects] = useState([]);
    const [cursor, setCursor] = useState(false);

    const doChange = (newData) => {
        if (onChange) {
            onChange(newData);
        }
    };
    const doSelected = (o) => {
        setSelects(o);
    };

    const doCursor = (o) => {
        setCursor(o.cursor);
    };

    const doSelectFromPanel = (o) => {
        setOuterSelects(o);
    };

    return (
        <div className='editor'>
            <div>
                {children
                    && Children.map(children, (child) => cloneElement(child, {
                        data,
                        selects,
                        cursor,
                        onChange: doChange,
                        onSelect: doSelectFromPanel,

                    }))
                }
                {!children
                    && <EditorPanel
                        data={data}
                        selects = {selects}
                        cursor={cursor}
                        onChange={doChange}
                        onSelect={doSelectFromPanel}
                    />
                }
            </div>
            <EditorArea
                data = {data}
                selects={outerSelects}
                onChange={doChange}
                onSelected={doSelected}
                onCursor={doCursor}
            />
            <EditorDialog/>
        </div>
    );
}

export default Editor;
