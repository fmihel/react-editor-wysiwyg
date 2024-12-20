/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

const RP = 0xEDB88320; // parseInt('EDB88320',16)
/** crc32 hash sum
 *  from:
 *  https://simplycalc.com/crc32-text.php
 *
 *  Example:
 *  crc32.compute_string('mystring');
 */
class Crc32 {
    compute_string(str, reversedPolynomial = RP) {
        const table = this.generate(reversedPolynomial);
        let crc = 0;

        crc = this.initial();

        for (let i = 0; i < str.length; i++) crc = this.add_byte(table, crc, str.charCodeAt(i));

        crc = this.final(crc);
        return crc;
    }

    compute_string_hex(str, reversedPolynomial = RP) {
        const hash = this.compute_string(str, reversedPolynomial);
        return hash.toString(16);
    }

    compute_data(data, reversedPolynomial = RP) {
        const dataView = new DataView(data);
        const table = this.generate(reversedPolynomial);
        let crc = 0;

        crc = this.initial();

        for (let i = 0; i < dataView.byteLength; i++) crc = this.add_byte(table, crc, dataView.getUint8(i));

        crc = this.final(crc);
        return crc;
    }

    generate(reversedPolynomial) {
        const table = [];
        let i; let j; let
            n;

        for (i = 0; i < 256; i++) {
            n = i;
            for (j = 8; j > 0; j--) {
                if ((n & 1) == 1) {
                    n = (n >>> 1) ^ reversedPolynomial;
                } else {
                    n >>>= 1;
                }
            }
            table[i] = n;
        }

        return table;
    }

    initial() {
        return 0xFFFFFFFF;
    }

    add_byte(table, crc, byte) {
        crc = (crc >>> 8) ^ table[(byte) ^ (crc & 0x000000FF)];
        return crc;
    }

    final(crc) {
        crc = ~crc;
        crc = (crc < 0) ? (0xFFFFFFFF + crc + 1) : crc;
        return crc;
    }

    reverse(polynomial) {
        let reversedPolynomial = 0;

        for (let i = 0; i < 32; i++) {
            reversedPolynomial <<= 1;
            reversedPolynomial |= ((polynomial >>> i) & 1);
        }

        return reversedPolynomial;
    }
}

export default new Crc32();
