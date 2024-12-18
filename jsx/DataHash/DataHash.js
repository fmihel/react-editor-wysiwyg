import getid from '../js/getid';
import Data from './Data';

const list = {};

class DataHash {
    static create(data = []) {
        const hash = getid('hash', 5);
        list[hash] = new Data(data);
        return hash;
    }

    static free(hash) {
        delete list[hash];
    }

    static data(hash) {
        return list[hash];
    }
}

export default DataHash;
