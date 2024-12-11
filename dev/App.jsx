import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from '../jsx/Editor.jsx';
import Html from '../utils/Html.js';

const HTML = 'Simple';// text write to filed.';
function App() {
    const [data, setData] = useState(Html.toData(HTML));
    const [code, setCode] = useState('');

    const doDecode = (from) => {
        // console.log(Html.fromData(from));
        setCode(Html.fromData(from));
    };

    const decode = useCallback(_.debounce(doDecode, 1000), []);

    const doChange = (newData) => {
        setData(newData);
        decode(newData);
    };

    return (
        <>
            <div>
                <Editor onChange={doChange} data = {data}/>
            </div>
            <code>
                {code}
            </code>
        </>
    );
}

export default App;