import crc32 from '../js/crc32';
import Html from '../../utils/Html';
import HtmlSpecialChars, {
    CR_CHAR, CR_HTML, SPACE_CHAR, SPACE_HTML,
} from '../js/HtmlSpecialChars';
import clone from './clone';
import EditorTagClass from '../EditorTags/EditorTagClass';

const buffer = {
    hash: '',
    data: [],
};

class clipboard {
    static writeText(text) {
        navigator.clipboard.writeText(text);
    }

    static async readText() {
        const text = await navigator.clipboard.readText();
        return text;
    }

    static writeData(data) {
        const text = data.map((it) => EditorTagClass.asText(it)).join('');
        // console.log({ data, text });
        buffer.hash = crc32.compute_string_hex(text);
        buffer.data = [...data];

        this.writeText(text);
    }

    static async readData() {
        const text = await this.readText();
        if (text) {
            const hash = crc32.compute_string_hex(text);

            if (buffer.hash === hash) {
                return clone(buffer.data);
            }

            return Html.toData(HtmlSpecialChars.shield(text).replaceAll(CR_CHAR, CR_HTML))
                .map((it) => ({
                    ...it,
                    ...it.value ? { value: HtmlSpecialChars.unShield(it.value) } : {},
                }));
        }
        return [];
    }
}

export default clipboard;
