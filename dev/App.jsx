import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import Editor from '../jsx/Editor.jsx';
import Html from '../utils/Html.js';
import { LOW, MID, HIGH } from './demoData.js';
import Parsing from '../jsx/js/Parsing.js';
import replaceAll from '../jsx/js/replaceAll.js';

const HTML = `
Cъешь ещё этих мягких <span style="color:red;font-weight:bold">ф</span>ранцузских булок, да выпей чаю!
<br>The quick brown <a href="https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%81%D0%B8%D1%86%D0%B0">fox</a> jumps over the lazy dog.
`;
const TEST = `<div style="font-size:1.25rem;line-height:1.3rem;padding-bottom:24px">Ленинградская область<br> Псковская область<br> Республика Карелия</div>

СПБ, п. Шушары, ул. Образцовая, д. 5, к. 2, пом. 11Н<br>
+7 (812) 934-88-87<br>
+7 (911) 177-88-89<br>
Windecoko@yandex.ru`;
// const HTML = `12 `;
function App() {
    const [data1, setData1] = useState(Html.toData(TEST));
    // const [data2, setData2] = useState(Html.toData('Text in other Editor'));
    const [code, setCode] = useState('');
    const [page, setPage] = useState(1);

    const doDecode = (from) => {
        setCode(Html.fromData(from).replaceAll('&nbsp;', ' '));
    };

    const decode = useCallback(_.debounce(doDecode, 1000), []);

    const doChange1 = (newData) => {
        setData1(newData);
        decode(newData);
    };
    // const doChange2 = (newData) => {
    //     setData2(newData);
    // };

    return (
        <>

            <div key='1' style={{ padding: 5, height: 200 }}>
                <Editor onChange={doChange1} data = {data1}/>
            </div>

            {/* <div key='2' style={{ padding: 5, height: 200 }}>
                <Editor onChange={doChange2} data = {data2}/>
            </div> */}
            {/* <button onClick={() => { setPage(page === 1 ? 2 : 1); }}>page {page}</button> */}
            <code
                style={{
                    height: '30%',
                    border: '1px solid gray',
                    padding: 5,
                    margin: 5,
                    fontSize: '0.8rem',
                    overflow: 'auto',
                }}
            >
                {code}
            </code>
            <div
                style={{
                    margin: 5,
                }}
            >
                length {data1.length}
            </div>
        </>
    );
}

export default App;
