import { DIALOG_ID, EDITOR_DIALOG_ACTION } from './consts.js';
import Dialog from './Dialog/Dialog.jsx';

function dialog({ Prop, data, param }) {
    dialog.dispatch({
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
}

dialog.dispatch = undefined;

dialog.result = (data) => {
    Dialog.result(DIALOG_ID, data);
};

export default dialog;
