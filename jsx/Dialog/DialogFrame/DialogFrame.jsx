/* eslint-disable no-unused-expressions */
import React from 'react';
import Footer from '../Footer/Footer.jsx';
import dialog from '../dialog.js';

function DialogFrame({
    className,
    style = {},
    footer = false,
    children,
}) {
    const doClickFooter = (o) => {
        // btnPress = o.id;
        dialog.result((result) => ({ ...result, btn: o.id }));
        dialog.close();
    };
    return (
        <div frame='' style={{ ...style }} className={className || ''}>
            <div body='' style={{}}>
                {children}
            </div>

            <div footer='' style={{ ...footer ? {} : { display: 'none' } }}>
                <Footer list={footer} onClick = {doClickFooter}/>
            </div>
        </div>
    );
}

export default DialogFrame;
