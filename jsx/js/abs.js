export default function abs(dom) {
    const rect = dom.getBoundingClientRect();
    const {
        left, top, width, height,
    } = rect;
    return {
        x: left + (window.scrollX || 0),
        y: top + (window.scrollY || 0),
        w: width,
        h: height,
    };
}
