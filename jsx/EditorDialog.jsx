/* eslint-disable default-case */
import React, { useEffect, useReducer } from 'react';
import { createPortal } from 'react-dom';
import DialogFrame from './Dialog/DialogFrame/DialogFrame.jsx';
// import { DIALOG_ID } from './EditorDialog/consts';
import get from './js/get.js';
import dialog from './Dialog/dialog.js';

const EDITOR_DIALOG_ACTION = 'editor_dialog_action_init_yhew73';
const REDUX_STATE_FIELD = 'editor_dlg_838';

const reducer = (state, action) => {
    switch (action.type) {
    case EDITOR_DIALOG_ACTION: {
        return {
            ...state,
            [REDUX_STATE_FIELD]: {
                ...action.payload,
            },
        };
    }
    // throw Error(`Unknown action: ${action.type}`);
    }
};
const global = {
    dispatch: undefined,
};

function EditorDialog({}) {
    const [dialogData, dispatch] = useReducer(reducer, undefined);

    useEffect(() => {
        global.dispatch = dispatch;
    }, [dialogData]);

    const doChangeProp = (data) => {
        dialog.result(() => ({ data }));
    };
    const { Prop, data, footer } = get(dialogData, [REDUX_STATE_FIELD], {});
    return (
        <>
            {Prop
                && createPortal(
                    <DialogFrame footer={footer}>
                        <Prop {...data} onChange={doChangeProp} />
                    </DialogFrame>,
                    dialog.create(),
                )
            }
        </>
    );
}

EditorDialog.open = ({ Prop, data, footer }) => {
    global.dispatch({
        type: EDITOR_DIALOG_ACTION,
        payload: {
            Prop,
            data,
            footer: footer || [
                { id: 'ok', caption: 'ok' },
                { id: 'cancel', caption: 'cancel' },
            ],

        },
    });
    return dialog.open();
};

EditorDialog.close = (result) => {
    dialog.result(result);
    dialog.close();
};

export default EditorDialog;
