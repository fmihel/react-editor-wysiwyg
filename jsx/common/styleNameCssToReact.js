import { ABC, _abc } from './ABC';

export default (name) => {
    let out = name;
    let pos = out.indexOf('-');

    while (pos > -1) {
        const _s = out.substring(pos, pos + 2);
        const index = _abc.indexOf(_s);
        out = out.replaceAll(_s, ABC[index]);

        pos = out.indexOf('-');
    }

    return out;
};
