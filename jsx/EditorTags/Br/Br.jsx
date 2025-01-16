/* eslint-disable camelcase */
import React from 'react';
import getid from '../../js/getid';

function Br({
    id,
    cursor = false,
    select = false,
    onClick,
}) {
    return (
        <>

            <span key="2" className={`br-tag${cursor ? ' cursor' : ''}` } >
                {/* ↳ */}
                <br id={id} key="1" />
            </span>
        </>
    );
}

Br.createData = (data = {}) => ({
    id: getid(),
    type: 'br',
    value: '<br>',
    ...data,

});

Br.asText = () => '\n';

const isBr = (o) => o === 'br' || o.type === 'br';

export {
    isBr,
};

export default Br;
