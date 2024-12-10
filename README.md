# react-editor-wysyvig v0.0.2

Simple wysyvig editor on React .

# Attention ! The version is unstable and is under development !!
``This is a simple editor, developed for internal needs. Support for single-level nesting tags is assumed.``

### install
```bash
$ npm i react-editor-wysyvig
```

### simple use

```jsx
import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from 'react-editor-wysyvig/Editor.js';
import Html from 'react-editor-wysyvig/utils/Html.js';

const HTML = 'Simple<br>text';// init html text';

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
            <div>
                <Editor onChange={doChange} data = {data}/>
            </div>
            <code>
                {code}
            </code>
        </>
    );
}

```

