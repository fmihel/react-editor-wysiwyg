/* eslint-disable prefer-destructuring */
import get from '../jsx/js/get';
import keys from '../jsx/js/keys';

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

    static isEmptyProp(value) {
        return (value === undefined || `${value}`.trim() === '');
    }

    static eq(style1, style2) {
        const keys1 = keys(style1).filter((key) => !this.isEmptyProp(style1[key], this.isEmptyProp));
        const keys2 = keys(style2).filter((key) => !this.isEmptyProp(style2[key], this.isEmptyProp));

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
