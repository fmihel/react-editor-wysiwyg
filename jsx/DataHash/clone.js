import getid from '../js/getid';

export default (data) => data.map((it) => ({ ...it, id: getid(), style: { ...it.style } }));
