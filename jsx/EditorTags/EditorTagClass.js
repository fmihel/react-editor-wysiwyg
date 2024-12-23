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
            _tags[type] = o[type];
        });
    }

    static get(type) {
        return _tags[type];
    }

    static createData(type, data) {
        return this.get(type).createData(data);
    }

    static asText(item) {
        const tag = this.get(item.type);

        if (tag.asText) {
            return tag.asText(item);
        }
        return item.value || '';
    }
}

export default EditorTagClass;
