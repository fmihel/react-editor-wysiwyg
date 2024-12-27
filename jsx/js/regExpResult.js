/* eslint-disable no-cond-assign */
export default (regexOrStr, str, callback, opt = 'gm') => {
    const out = [];
    const regex = typeof regexOrStr === 'string' ? new RegExp(regexOrStr, opt) : regexOrStr;

    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        const groups = [];
        m.forEach((match, groupIndex) => {
            // console.log(`Found match, group ${groupIndex}: ${match}`);
            groups.push(match);
        });

        if (callback) {
            const result = callback(groups, regex.lastIndex);
            if (result) {
                out.push(result);
            }
        } else {
            out.push(groups);
        }
    }

    return out;
};
