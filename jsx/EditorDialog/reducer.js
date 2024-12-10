import { EDITOR_DIALOG_ACTION } from './consts';

/* eslint-disable default-case */
export default (state, action) => {
    switch (action.type) {
    case EDITOR_DIALOG_ACTION: {
        return {
            ...action.payload,
        };
    }
    // throw Error(`Unknown action: ${action.type}`);
    }
};
