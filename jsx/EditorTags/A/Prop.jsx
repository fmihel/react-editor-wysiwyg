import React, { useEffect, useState } from 'react';

export default ({
    id = 'a-prop',
    className = '',
    style = {},
    href,
    value,
    onChange,
}) => {
    const [aHref, setHref] = useState('');
    const [aValue, setValue] = useState('');

    useEffect(() => {
        setHref(href);
        setValue(value);
    }, [value, href]);

    const change = (o) => {
        if (onChange) {
            onChange({
                href: aHref,
                value: aValue,
                ...o,
            });
        }
    };

    const doChangeHref = (o) => {
        setHref(o.target.value);
        change({ href: o.target.value });
    };
    const doChangeValue = (o) => {
        setValue(o.target.value);
        change({ value: o.target.value });
    };

    return (
        <div id={id} className={className} style={{ ...style }}>
            <div>
                <input value={aHref} onChange={doChangeHref}/>
            </div>
            <div>
                <input value={aValue} onChange={doChangeValue}/>
            </div>
        </div>
    );
};
