import gettype from './gettype';
import keys from './keys';

class eq {
    static id(id1, id2) { return `${id1}` === `${id2}`; }

    static array(a, b) {
        if (a.length !== b.length) return false;
        return !a.find((m) => !b.find((v) => `${v}` === `${m}`));
    }

    static dataItem(d1, d2) {
        return this.id(d1.id, d2.id);
    }

    static object(o1, o2, param = {}) {
        const p = {
            include: [],
            exclude: [],
            custom: {/* name:func condition(param1,param2) */},
            ...param,
        };

        const oType1 = gettype(o1);
        const oType2 = gettype(o2);

        if (oType1 === 'array' && oType2 === 'array') {
            if (o1.length !== o2.length) {
                return false;
            }

            for (let i = 0; i < o1.length; i++) {
                const value1 = o1[i];
                const value2 = o2[i];

                if (this.is_simple_type(value1) && this.is_simple_type(value2)) {
                    if (!this.simple(value1, value2)) {
                        return false;
                    }
                } else {
                    if (gettype(value1) !== gettype(value2)) {
                        return false;
                    }

                    if (!this.object(value1, value2, p)) {
                        return false;
                    }
                }
            }// for

            return true;
        } if (oType1 === 'object' && oType1 === 'object') {
            const keys1 = keys(o1, p);
            const keys2 = keys(o2, p);

            if (keys1.length !== keys2.length) {
                return false;
            }

            return !keys1.find((key) => {
                if (!(key in o2)) {
                    return true;
                }
                const value1 = o1[key];
                const value2 = o2[key];

                if (p.custom[key]) {
                    return !p.custom[key](value1, value2);
                }

                if (this.is_simple_type(value1) && this.is_simple_type(value2)) {
                    return !this.simple(value1, value2);
                }

                const type1 = gettype(value1);
                const type2 = gettype(value2);

                if (type1 !== type2) {
                    return true;
                }

                return !this.object(value1, value2, p);
            });
        }
        return false;
    }

    static bool(b1, b2) {
        return !!b1 === !!b2;
    }

    static is_simple_type(a) {
        return ['string', 'number', 'boolean', 'null', 'undefined'].indexOf(gettype(a)) > -1;
    }

    static simple(a, b) {
        const type1 = gettype(a);
        const type2 = gettype(b);

        const sympleTypes = ['string', 'number'];
        if (sympleTypes.indexOf(type1) > -1 && sympleTypes.indexOf(type2) > -1) {
            return `${a}` === `${b}`;
        }

        const sympleTypesBool = ['string', 'number', 'boolean', 'null', 'undefined'];
        if (sympleTypesBool.indexOf(a) > -1 && sympleTypesBool.indexOf(b) > -1) {
            return this.bool(a, b);
        }

        return false;
    }
}

export default eq;
