/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import get from '../../js/get.js';
import Prop from './Prop.jsx';
import dialog from '../../EditorDialog.jsx';
import getid from '../../js/getid.js';

function Img({
    id,
    type,
    alt,
    src,
    style,
    class: css = '',
    select,
    cursor,
    onClick,
    onChange,
}) {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef();
    const doClick = (sender) => {
        if (onClick) {
            onClick({ id, type, sender });
        }
        sender.stopPropagation();
    };
    const change = (o) => {
        if (onChange) {
            onChange({
                id, type, alt, src, ...o,
            });
        }
    };
    const onDoubleClick = (o) => {
        dialog.open({ Prop, data: { src } })
            .then(({ data, btn }) => {
                if (btn === 'ok') {
                    change(data);
                }
            });
        o.stopPropagation();
        // o.preventDefault();
    };

    const onAfterLoad = () => {
        setIsLoading(true);
    };

    useEffect(() => {
        if (isLoading && ref && ref.current && src) {
            setTitle(`${src.split(/(\\|\/)/g).pop()} ( ${ref.current.naturalWidth} x ${ref.current.naturalHeight} )`);
        }
    }, [isLoading, ref, src]);

    return (
        <>
            <img
                ref ={ref}
                id={id}
                alt={alt}
                style={{ ...style }}
                className={`img-tag ${cursor ? 'cursor ' : ''}${select ? 'select ' : ''}${css ? `${css} ` : ''}` }
                onMouseDown={doClick}
                onDoubleClick={onDoubleClick}
                src={src}
                title={title}
                onLoad={onAfterLoad}
            />
        </>
    );
}

Img.createData = (data = {}) => ({
    id: getid(),
    type: 'img',

    alt: '',
    src: '',
    class: '',
    ...data,
    style: { ...get(data, ['style'], { width: 64, height: 64 }) },

});

Img.asText = (item) => `[img:${item.src || ''}]`;

export default Img;
