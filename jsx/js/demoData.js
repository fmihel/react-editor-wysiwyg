import EditorTagClass from '../EditorTags/EditorTagClass';

let _id = 1;
const id = () => ({ id: _id++ });
const demoData = [
    EditorTagClass.createData('char', { ...id(), value: 'T' }),
    EditorTagClass.createData('char', { ...id(), value: 'e' }),
    EditorTagClass.createData('char', { ...id(), value: 'x' }),
    EditorTagClass.createData('char', { ...id(), value: 't' }),
    EditorTagClass.createData('char', { ...id(), value: ' ' }),
    EditorTagClass.createData('char', { ...id(), value: 'w' }),
    EditorTagClass.createData('char', { ...id(), value: 'i' }),
    EditorTagClass.createData('char', { ...id(), value: 't' }),
    EditorTagClass.createData('char', { ...id(), value: 'h' }),
    EditorTagClass.createData('char', { ...id(), value: ' ' }),
    EditorTagClass.createData('char', { ...id(), value: 'i' }),
    EditorTagClass.createData('char', { ...id(), value: 'm' }),
    EditorTagClass.createData('char', { ...id(), value: 'a' }),
    EditorTagClass.createData('char', { ...id(), value: 'g' }),
    EditorTagClass.createData('char', { ...id(), value: 'e' }),
    EditorTagClass.createData('br', { ...id() }),
    EditorTagClass.createData('char', { ...id(), value: 'l' }),
    EditorTagClass.createData('char', { ...id(), value: 'e' }),
    EditorTagClass.createData('char', { ...id(), value: 'f' }),
    EditorTagClass.createData('char', { ...id(), value: 't' }),
    EditorTagClass.createData('img', { id: 'img', src: 'https://windeco.su/media/senator/page/senator/senator_foto_pdf/senator_foto_000001_320270.jpg' }),
    EditorTagClass.createData('char', { ...id(), value: 'r' }),
    EditorTagClass.createData('char', { ...id(), value: 'i' }),
    EditorTagClass.createData('char', { ...id(), value: 'g' }),
    EditorTagClass.createData('char', { ...id(), value: 'h' }),
    EditorTagClass.createData('char', { ...id(), value: 't' }),
    EditorTagClass.createData('br', { ...id() }),
    EditorTagClass.createData('char', { ...id(), value: '@' }),
];

export default demoData;
