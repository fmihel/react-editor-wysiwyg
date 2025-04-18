import childDOM from './childDOM';

function eachDOM(dom, callback, parent) {
    if (callback(dom, parent) === true) {
        return true;
    }
    const childs = childDOM(dom);
    for (let i = 0; i < childs.length; i++) {
        if (eachDOM(childs[i], callback, dom) === true) {
            return true;
        }
    }
    return false;
}

export default eachDOM;
