import Br from './Br/Br.jsx';
import A from './A/A.jsx';
import Char from './Char/Char.jsx';
import End from './End/End.jsx';
import Img from './Img/Img.jsx';
import Space from './Space/Space.jsx';

const _tags = {
    a: A,
    br: Br,
    char: Char,
    img: Img,
    space: Space,
    end: End,
};

class EditorTagClass {
    static add(o) {
        Object.keys(o).map((type) => {
            if (!(type in _tags)) {
                _tags[type] = o[type];
            } else {
                console.error(`tag ${type} already exists`);
            }
        });
    }

    static get(type) {
        return _tags[type];
    }

    static createData(type, data) {
        return this.get(type).createData(data);
    }
}

export default EditorTagClass;
