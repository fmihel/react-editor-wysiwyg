export const ABC = [];
export const _abc = [];

for (let i = 65; i <= 90; i++) {
    const c = String.fromCharCode(i);
    ABC.push(c);
    _abc.push(`-${c.toLowerCase()}`);
}
