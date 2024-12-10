/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import './Dialog.scss';
import Footer from './Footer/Footer.jsx';

const promises = {};
let btnPress;

function Dialog({
    id,
    className,
    style = {},
    footer = false,
    children,
}) {
    const refDialog = useRef();

    const modif = (mutationList/* , observer */) => {
        mutationList.map((mutation) => {
            if (mutation.attributeName === 'open') {
                if (refDialog.current.getAttribute('open') === null) {
                    if (id in promises) {
                        if (btnPress) {
                            promises[id].ok({ result: promises[id].result, btn: btnPress });
                        } else {
                            promises[id].err(undefined);
                        }
                        promises[id] = undefined;
                        btnPress = undefined;
                    }
                }
            }
        });
        // for (const mutation of mutationList) {
        //     if (mutation.type === 'childList') {
        //         console.log('A child node has been added or removed.');
        //     } else if (mutation.type === 'attributes') {
        //         console.log(`The ${mutation.attributeName} attribute was modified.`);
        //     }
        // }
    };
    useEffect(() => {
        if (refDialog) {
            const observer = new MutationObserver(modif);
            observer.observe(refDialog.current, { attributes: true, childList: false, subtree: false });
            return () => {
                observer.disconnect();
            };
        }
    }, [refDialog, id]);

    const doClickFooter = (o) => {
        btnPress = o.id;
        Dialog.close(id);
    };
    return (
        <dialog
            ref={refDialog}
            id={id}
            className={`dialog${className ? (` ${className}`) : ''}`}
            caption="text"
        >
            <div frame='' style={{ ...style }}>
                <div body='' style={{}}>
                    {children}
                </div>

                <div footer='' style={{ ...footer ? {} : { display: 'none' } }}>
                    <Footer list={footer} onClick = {doClickFooter}/>
                </div>
            </div>
        </dialog>
    );
}

Dialog.get = (id) => document.getElementById(id);

Dialog.open = ({ id, modal = true }) => {
    const dlg = Dialog.get(id);
    modal ? dlg.showModal() : dlg.show();
    return new Promise((ok, err) => {
        promises[id] = { ok, err, result: {} };
    });
};
Dialog.result = (id, result) => {
    promises[id].result = result;
};
Dialog.close = (id, result = undefined) => {
    if (result !== undefined) {
        promises[id].result = result;
    }
    const dlg = Dialog.get(id);
    dlg.close();
};

export default Dialog;
