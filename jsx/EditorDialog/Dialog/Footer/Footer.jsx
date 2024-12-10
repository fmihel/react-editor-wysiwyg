import React, { useEffect, useState } from 'react';
import gettype from '../../../common/gettype';

function toBtns(list) {
    const type = gettype(list);

    if (type === 'object') {
        const keys = Object.keys(list);
        return keys.map((key) => ({
            id: 'id' in list[key] ? list[key].id : key,
            caption: list[key].caption || key,
            className: list[key].className || '',
            style: list[key].style,
        }));
    }

    if (type === 'array') {
        return list.map((it) => ({
            ...it,

        }));
    }

    return [];
}

function Footer({ list, onClick }) {
    const [btns, setBtns] = useState([]);
    useEffect(() => {
        setBtns(toBtns(list));
    }, [list]);

    const doClick = (o) => {
        if (onClick) {
            onClick({ id: o.target.id });
        }
    };
    return (
        <>
            {btns.map(({ id, caption }) => <button key={id} id={id} onClick={doClick}>{caption}</button>)}
        </>
    );
}

export default Footer;
