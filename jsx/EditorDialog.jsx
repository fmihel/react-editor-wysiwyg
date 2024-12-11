import React, { useEffect, useReducer } from 'react';
import Dialog from './Dialog.jsx';
// import { DIALOG_ID } from './EditorDialog/consts';

const EDITOR_DIALOG_ACTION = 'editor_dialog_action_init_yhew73';
const DIALOG_ID = 'prop-dialog';

/* eslint-disable default-case */
const reducer = (state, action) => {
    switch (action.type) {
    case EDITOR_DIALOG_ACTION: {
        return {
            ...action.payload,
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
    }, [dispatch]);

    const doChangeProp = (o) => {
        Dialog.result(DIALOG_ID, o);
    };

    return (
        <Dialog id={DIALOG_ID} {...dialogData && dialogData.param ? dialogData.param : {}}>
            {(dialogData) && <dialogData.Prop {...dialogData.data} onChange={doChangeProp} />}
        </Dialog>
    );
}

EditorDialog.open = ({ Prop, data, param }) => {
    global.dispatch({
        type: EDITOR_DIALOG_ACTION,
        payload: {
            Prop,
            data,
            param: {
                footer: [
                    { id: 'ok', caption: 'ok' },
                    { id: 'cancel', caption: 'cancel' },
                ],
                ...param,
            },
        },
    });
    return Dialog.open({
        id: DIALOG_ID,
        modal: true,
    });
};

export default EditorDialog;
