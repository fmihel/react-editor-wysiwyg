import getTimeSec from './getTimeSec';

const intervals = {
    common: 0,
};
export default (interval, name = 'common') => {
    const current = getTimeSec();

    if (!(name in intervals)) {
        intervals[name] = 0;
    }

    if (current - intervals[name] > interval) {
        intervals[name] = current;
        return true;
    }

    return false;
};
