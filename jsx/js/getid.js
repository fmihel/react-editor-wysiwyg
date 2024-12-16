/* eslint-disable camelcase */
import random_str from './random_str';

let id = 0;

export default (pref = '', len = 3) => {
    id++;
    return pref + random_str(len) + id;
};
