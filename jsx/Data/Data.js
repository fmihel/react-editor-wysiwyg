import getid from '../js/getid';
import DataCore from './DataCorejs';

const list = {};

function Data(hash) {
    return list[hash];
}

Data.create = (data = []) => {
    const hash = getid('hash', 5);
    list[hash] = new DataCore(data);
    return hash;
};

Data.free = (hash) => {
    delete list[hash];
};

export default Data;
