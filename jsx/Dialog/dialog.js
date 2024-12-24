/* eslint-disable camelcase */
import random_str from '../js/random_str';
// import DOM from '../js/DOM';
// const ID_DIALOG = `prop-dialog-${random_str(3)}`;
const ID_DIALOG = 'prop-dialog-7378493';
const global = {
    dom: undefined,
    promise: undefined,
};
class dialog {
    static create() {
        if (!global.dom) {
            global.dom = document.createElement('dialog');
            global.dom.setAttribute('id', ID_DIALOG);
            global.dom.classList.add('editor-dialog');
            document.body.appendChild(global.dom);
            this._addStateListener();
        }

        return global.dom;
    }

    static open() {
        const dlg = this.create();
        // dlg.innerHTML = '';
        dlg.showModal();

        return new Promise((ok, err) => {
            global.promise = {
                ok, err, result: {},
            };
        });
    }

    static close() {
        if (global.dom) {
            global.dom.close();
        }
    }

    static result(callback) {
        if (callback) {
            if (global.promise) {
                global.promise.result = callback(global.promise.result);
            }
        }
    }

    static _modif(mutationList/* , observer */) {
        if (global.dom) {
            mutationList.map((mutation) => {
                if (mutation.attributeName === 'open') {
                    if (global.dom.getAttribute('open') === null) {
                        if (global.promise) {
                            global.promise.ok(global.promise.result);
                            global.promise = undefined;
                        }
                    }
                }
            });
        }
    }

    static _addStateListener() {
        const observer = new MutationObserver(this._modif);
        observer.observe(global.dom, { attributes: true, childList: false, subtree: false });
    }
}
// dialog.create();
export default dialog;
