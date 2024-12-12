export const KEY_CODE_C = 67;
export const KEY_CODE_V = 86;
export const KEY_CODE_LEFT = 37;
export const KEY_CODE_RIGHT = 39;
export const KEY_CODE_UP = 38;
export const KEY_CODE_DOWN = 40;
export const KEY_CODE_BACKSPACE = 8;
export const KEY_CODE_DEL = 46;
export const KEY_CODE_ENTER = 13;
export const KEY_CODE_ESC = 27;
export const KEY_CODE_SPACE = 32;
export const KEY_CODE_TAB = 9;

export const KEY_CODE_0 = 48;
export const KEY_CODE_9 = 57;
export const KEY_CODE_A = 65;
export const KEY_CODE_Z = 90;

export const KEY_CODE_APOSTROF = 192;
export const KEY_CODE_MINUS = 189;
export const KEY_CODE_PLUS = 187;
export const KEY_CODE_SKOB_LEFT = 219;
export const KEY_CODE_SKOB_RIGHT = 221;
export const KEY_CODE_TZ = 186;
export const KEY_CODE_KOV = 222;
export const KEY_CODE_LINE = 220;
export const KEY_CODE_SLASH_LEFT = 191;
export const KEY_CODE_SLASH_RIGHT = 226;

export function isCharKey(keyCode) {
    if (keyCode >= KEY_CODE_0 && keyCode <= KEY_CODE_9) {
        return true;
    }

    if (keyCode >= KEY_CODE_A && keyCode <= KEY_CODE_Z) {
        return true;
    }

    if ([KEY_CODE_APOSTROF,
        KEY_CODE_MINUS,
        KEY_CODE_PLUS,
        KEY_CODE_SKOB_LEFT,
        KEY_CODE_SKOB_RIGHT,
        KEY_CODE_TZ,
        KEY_CODE_KOV,
        KEY_CODE_LINE,
        KEY_CODE_SLASH_LEFT,
        KEY_CODE_SLASH_RIGHT,
    ].find((it) => it == keyCode)) {
        return true;
    }

    return false;
}
