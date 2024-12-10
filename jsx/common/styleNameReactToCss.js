/* eslint-disable array-callback-return */
import { ABC, _abc } from './ABC';

export default (name) => {
    if (name.indexOf('-webkit') > -1 || name.indexOf('-moz') > -1) {
        return name;
    }
    let out = name;
    ABC.map((a, i) => {
        out = out.replace(a, _abc[i]);
    });
    return out;
};
