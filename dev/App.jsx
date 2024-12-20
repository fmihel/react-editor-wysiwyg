import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from '../jsx/Editor.jsx';
import Html from '../utils/Html.js';
import { LOW, MID, HIGH } from './demoData.js';

function App() {
    const [data, setData] = useState(Html.toData(LOW));
    const [code, setCode] = useState('');
    const [page, setPage] = useState(1);

    const doDecode = (from) => {
        setCode(Html.fromData(from).replaceAll('&nbsp;', ' '));
    };

    const decode = useCallback(_.debounce(doDecode, 1000), []);

    const doChange = (newData) => {
        setData(newData);
        decode(newData);
    };

    return (
        <>
            {page === 1
                && <div key='1' style={{ padding: 5, height: 200 }}>
                    <Editor onChange={doChange} data = {data}/>
                </div>
            }
            {page === 2
                && <div key='2' style={{ padding: 5, height: 200 }}>
                    <Editor onChange={doChange} data = {data}/>
                </div>
            }
            <button onClick={() => { setPage(page === 1 ? 2 : 1); }}>page {page}</button>
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
                length {data.length}
            </div>
        </>
    );
}

export default App;
