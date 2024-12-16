/* eslint-disable no-return-assign */
export const LT_HTML = '&lt;';
export const LT_CHAR = '<';
export const LT_SHIELD = '◄';

export const GT_HTML = '&gt;';
export const GT_CHAR = '>';
export const GT_SHIELD = '►';

export const CR_HTML = '<br>';
export const CR_CHAR = '↳';

class HtmlSpecialChars {
    /** < to &lt; */
    static code(str) {
        let out = str;
        [
            [LT_CHAR, LT_HTML],
            [GT_CHAR, GT_HTML],
        ].map((o) => out = out.replaceAll(o[0], o[1]));
        return out;
    }

    /** &lt; to < */
    static encode(str) {
        let out = str;
        [
            [LT_CHAR, LT_HTML],
            [GT_CHAR, GT_HTML],
        ].map((o) => out = out.replaceAll(o[1], o[0]));
        return out;
    }

    static shield(str) {
        let out = str;
        [
            [LT_CHAR, LT_SHIELD],
            [GT_CHAR, GT_SHIELD],
        ].map((o) => out = out.replaceAll(o[0], o[1]));
        return out;
    }

    static unShield(str) {
        let out = str;
        [
            [LT_CHAR, LT_SHIELD],
            [GT_CHAR, GT_SHIELD],
        ].map((o) => out = out.replaceAll(o[1], o[0]));
        return out;
    }
}

export default HtmlSpecialChars;