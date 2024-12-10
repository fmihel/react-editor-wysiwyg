import React, { useEffect, useState } from 'react';

export default ({
    id = 'img-prop',
    className = '',
    style = {},
    src,
    onChange,
}) => {
    const [aSrc, setASrc] = useState('');
    useEffect(() => {
        setASrc(src);
    }, [src]);

    const doChange = (o) => {
        setASrc(o.target.value);
        if (onChange) {
            onChange({ src: o.target.value });
        }
    };
    return (
        <div id={id} className={className} style={{ ...style }}>
            <div style={{ width: 200, height: 200 }}>
                <img src={aSrc} style={{ maxWidth: 200, maxHeight: 200 }}/>
            </div>
            <div>
                <input id='src' value={aSrc} onChange={doChange}/>
            </div>
        </div>
    );
}; '1';
