import EditorTags from '../EditorTags/EditorTags.jsx';

let _id = 1;
const id = () => ({ id: _id++ });
const demoData = [
    EditorTags.createData('char', { ...id(), value: 'T' }),
    EditorTags.createData('char', { ...id(), value: 'e' }),
    EditorTags.createData('char', { ...id(), value: 'x' }),
    EditorTags.createData('char', { ...id(), value: 't' }),
    EditorTags.createData('char', { ...id(), value: ' ' }),
    EditorTags.createData('char', { ...id(), value: 'w' }),
    EditorTags.createData('char', { ...id(), value: 'i' }),
    EditorTags.createData('char', { ...id(), value: 't' }),
    EditorTags.createData('char', { ...id(), value: 'h' }),
    EditorTags.createData('char', { ...id(), value: ' ' }),
    EditorTags.createData('char', { ...id(), value: 'i' }),
    EditorTags.createData('char', { ...id(), value: 'm' }),
    EditorTags.createData('char', { ...id(), value: 'a' }),
    EditorTags.createData('char', { ...id(), value: 'g' }),
    EditorTags.createData('char', { ...id(), value: 'e' }),
    EditorTags.createData('br', { ...id() }),
    EditorTags.createData('char', { ...id(), value: 'l' }),
    EditorTags.createData('char', { ...id(), value: 'e' }),
    EditorTags.createData('char', { ...id(), value: 'f' }),
    EditorTags.createData('char', { ...id(), value: 't' }),
    EditorTags.createData('img', { id: 'img', src: 'https://windeco.su/media/senator/page/senator/senator_foto_pdf/senator_foto_000001_320270.jpg' }),
    EditorTags.createData('char', { ...id(), value: 'r' }),
    EditorTags.createData('char', { ...id(), value: 'i' }),
    EditorTags.createData('char', { ...id(), value: 'g' }),
    EditorTags.createData('char', { ...id(), value: 'h' }),
    EditorTags.createData('char', { ...id(), value: 't' }),
    EditorTags.createData('br', { ...id() }),
    EditorTags.createData('char', { ...id(), value: '@' }),
];

export default demoData;
