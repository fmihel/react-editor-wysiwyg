# react-editor-wysiwyg v1.x

Simple wysiwyg editor on React .

###### ```Attention ! Editor for only desktop browser not mobile !!```
###### ```This is a simple editor, developed for internal needs. Support for single-level nesting tags is assumed.```

1. Install
2. Simple use Editor
3. Struct data of Editor component
4. Custom Editor panel  
5. Add custom tags 


## Install
```bash
$ npm i react-editor-wysiwyg
```

## Simple use 

The editor package includes a utility for converting simple HTML into editor data and back.

```jsx
import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from 'react-editor-wysiwyg';
import Html from 'react-editor-wysiwyg/utils/Html.js';
import 'react-editor-wysiwyg/style/Editor.scss';

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


## Struct data of Editor component
The editor works with an array of data, each element of which completely describes one displayed element (symbol, image, link, etc.). See the example draw "ok":

```jsx
import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from 'react-editor-wysiwyg';
import 'react-editor-wysiwyg/style/Editor.scss';

const  DATAS = [
    {id:'1',type:'char',value:'o',style:{}},
    {id:'2',type:'char',value:'k',style:{}},
];

function App() {
    const [data, setData] = useState(DATAS);

    const doChange = (newData) => {
        setData(newData);
    };

    return (
        <div>
            <Editor onChange={doChange} data = {data}/>
        </div>
    );
}

```

|name|type|notes|
|---|---|---|
|id|string|ident|
|type|string|type of tag component|
|value|string|displayed value|
|style|object|react css style for draw|



## Custom Editor panel
To replace the built-in style editing panel, add your own component inside the editor.

```jsx
import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Editor from 'react-editor-wysiwyg';
import 'react-editor-wysiwyg/style/Editor.scss';
import Panel from './Panel.jsx';

const  DATAS = [
    {id:'1',type:'char',value:'o',style:{}},
    {id:'2',type:'char',value:'k',style:{}},
];

function App() {
    const [data, setData] = useState(DATAS);

    const doChange = (newData) => {
        setData(newData);
    };

    return (
        <div>
            <Editor onChange={doChange} data = {data}>
                <Panel/>
            </Editor>
        </div>
    );
}

```

Example of custom Panel component
```jsx
import React, {
    useCallback, useState,
} from 'react';
import Style from 'react-editor-wysiwyg/utils/Style.js';
import eq from 'react-editor-wysiwyg/jsx/js/eq';

const Panel=({
    data,
    selects,
    onChange,
    cursor,
    onSelect,
}) =>{

    const change = (newData) => {
        if (onChange) {
            onChange(newData);
        }
    };
    const changeStyle = (modif) => {
        if (onChange) {
            let define;

            const newData = data.map((it) => {
                if (selects.find((sid) => eq.id(it.id, sid))) {
                    define = define || modif(it.style || {});
                    return {
                        ...it,
                        style: {
                            ...it.style,
                            ...define,
                        },
                    };
                }
                return { ...it };
            });

            onChange(newData);
        }
    };
    const bold = () => {
        changeStyle((style) => Style.toggle({ fontWeight: ['bold', ''] }, style));
    };

    const underline = () => {
        changeStyle((style) => Style.toggle({ textDecoration: ['underline', ''] }, style));
    };

    const italic = () => {
        changeStyle((style) => Style.toggle({ fontStyle: ['italic', ''] }, style));
    };


    return (
        <>
            <div className='editor-panel'>
                <button onClick={bold} >B</button>
                <button onClick={underline} >U</button>
                <button onClick={italic} >I</button>
            </div>
        </>
    );
}

export default Panel;
```


## Add custom tags 


To add your custom tag, you need to create a component corresponding to it and register it.


```jsx
/* eslint-disable camelcase */
import React from 'react';
import get from 'react-editor-wysiwyg/jsx/js/get';
import getid from 'react-editor-wysiwyg/jsx/js/getid';

function Block({
    id,
    type,
    value,
    style = {},
    cursor = false,
    select = false,
    onClick,
}) {
    const doClick = (sender) => {
        if (onClick) {
            onClick({
                id, type, value, sender,
            });
        }
    };

    return (
        <div
            id={id}
            style={{ ...style }}
            className={`${cursor ? 'cursor' : ''} ${select ? 'select' : ''}` }
            onMouseDown={doClick}
        >
            {value}
        </div>
    );
}

Block.createData = (data = {}) => ({
    id: getid(),
    type: 'block',

    value: '',
    ...data,
    style: { ...get(data, ['style'], {}) },
});

export default Block;

```
rigister it

```jsx
import React from 'react';
import { EditorTagClass } from 'react-editor-wysiwyg';
//register Block
EditorTagClass.add([{block:Block}]);
```

for use in Html.toData utils
```jsx
import { EditorTagClass } from 'react-editor-wysiwyg';
import Html from 'react-editor-wysiwyg/utils/Html';

let data = Html.toData('<span>text</span>',{editorTagClass:EditorTagClass});
```

