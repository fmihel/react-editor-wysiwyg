/* eslint-disable prefer-destructuring */
import get from '../jsx/common/get';
import keys from '../jsx/common/keys';

class Style {
    // static toggleValue(values, currentValue) {
    //     const currentIndex = values.indexOf(currentValue);
    //     const nextIndex = (currentIndex === -1 || currentIndex === values.length - 1) ? 0 : currentIndex + 1;
    //     return values[nextIndex];
    // }

    static toggle(toggles, current) {
        const out = {};
        Object.keys(toggles).map((styleName) => {
            const index = toggles[styleName].indexOf(current[styleName]);
            if (!(styleName in current) || index === -1 || index === toggles[styleName].length - 1) {
                out[styleName] = toggles[styleName][0];
            } else {
                out[styleName] = toggles[styleName][index + 1];
            }
        });
        return out;
    }

    static isNotEmptyProp(prop) {
        return (prop !== undefined && `${prop}`.trim() !== '');
    }

    static removeEmptyStyleProp(style) {
        const out = {};
        Object.keys(style).filter((name) => this.isNotEmptyProp(style[name])).map((key) => {
            out[key] = style[key];
        });
        return out;
    }

    static eq(style1, style2) {
        const keys1 = keys(style1).filter((key) => this.isNotEmptyProp(style1[key]));
        const keys2 = keys(style2).filter((key) => this.isNotEmptyProp(style2[key]));

        if (keys1.length !== keys2.length) {
            return false;
        }
        if (keys1.length === 0) {
            return true;
        }
        return !keys1.find((key) => get(style2, [key], false) !== style1[key]);
    }
}

export default Style;
