class history {
    static add(add, toHistory, max = 100) {
        if (toHistory.length >= max) {
            return [
                add,
                ...toHistory.slice(0, Math.min(toHistory.length, max) - 2),
                toHistory[toHistory.length - 1],
            ];
        }
        return [add, ...toHistory];
    }

    static restory(fromHistory, callback) {
        if (fromHistory.length > 0) {
            callback(fromHistory[0], fromHistory.slice(1));
        }
    }
}

export default history;
