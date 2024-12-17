import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from '../jsx/Editor.jsx';
import Html from '../utils/Html.js';

// const HTML = 'aaaaaaaaaa';// text write to filed.';
const HTML = `
1 aaaa aaaa aaaa aaaa aaaa aaaa  aaaa aaaa aaaa aaaa  aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 1<br>
2 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 2<br>
3 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 3<br>
4 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 4<br>
5 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 5<br>
6 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 6<br>
7 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 7<br>
8 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 8<br>
9 aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa xxxx 9<br>
`;

function App() {
    const [data, setData] = useState(Html.toData(HTML));
    const [code, setCode] = useState('');

    const doDecode = (from) => {
        setCode(Html.fromData(from));
    };

    const decode = useCallback(_.debounce(doDecode, 1000), []);

    const doChange = (newData) => {
        setData(newData);
        decode(newData);
    };

    return (
        <>
            <div style={{ padding: 5, width: 320, height: 200 }}>
                <Editor onChange={doChange} data = {data}/>
            </div>
            <code>
                {code}
            </code>
        </>
    );
}

export default App;
