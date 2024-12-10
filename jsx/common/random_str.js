export default (count) => {
    let res = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < count; i++) res += possible.charAt(Math.floor(Math.random() * possible.length));
    return res;
};
