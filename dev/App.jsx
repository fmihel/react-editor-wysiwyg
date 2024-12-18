import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from '../jsx/Editor.jsx';
import Html from '../utils/Html.js';
import { LOW, MID, HIGH } from './demoData.js';

function App() {
    const [data, setData] = useState(Html.toData(MID));
    const [code, setCode] = useState('');

    const doDecode = (from) => {
        setCode(Html.fromData(from));
    };

    const decode = useCallback(_.debounce(doDecode, 5000), []);

    const doChange = (newData) => {
        setData(newData);
        decode(newData);
    };

    return (
        <>
            <div style={{ padding: 5, height: 200 }}>
                <Editor onChange={doChange} data = {data}/>
            </div>

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
