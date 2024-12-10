/* eslint-disable camelcase */
import React from 'react';
import random_str from '../../common/random_str';

function Br({
    id,
    cursor = false,
    select = false,
    onClick,
}) {
    return (
        <>

            <span key="2" className={`${cursor ? 'cursor' : ''}` } style={{ minHeight: 12 }} >
                <br id={id} key="1" />
            </span>
        </>
    );
}

Br.createData = (data = {}) => ({
    id: random_str(3),
    type: 'br',
    ...data,

});

export default Br;
