import React, { useReducer } from 'react';
import Dialog from './Dialog.jsx';
// import { DIALOG_ID } from './EditorDialog/consts';
import get from './js/get.js';

const EDITOR_DIALOG_ACTION = 'editor_dialog_action_init_yhew73';
const DIALOG_ID = 'prop-dialog';
const REDUX_STATE_FIELD = 'editor_dlg_838';
/* eslint-disable default-case */
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

    // useEffect(() => {
    global.dispatch = dispatch;
    // }, [dispatch]);

    const doChangeProp = (o) => {
        Dialog.result(DIALOG_ID, o);
    };
    const { Prop, data, param } = get(dialogData, [REDUX_STATE_FIELD], {});
    return (
        <Dialog id={DIALOG_ID} {...param}>
            {Prop && <Prop {...data} onChange={doChangeProp} />}
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
