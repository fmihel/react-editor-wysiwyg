import abs from '../jsx/js/abs';
import eachDOM from '../jsx/js/eachDOM';

export default (domEditor) => {
    let xmax = 0; let ymax; let xmin = 0; let ymin = 0;
    let start = true;
    eachDOM(domEditor, (dom, parent) => {
        const current = abs(dom);
        if (parent) {
            if (start) {
                xmax = current.x + current.w;
                xmin = current.x;
                ymax = current.y + current.h;
                ymin = current.y;
            } else {
                xmax = Math.max(xmax, current.x + current.w);
                xmin = Math.min(xmin, current.x);
                ymax = Math.max(ymax, current.y + current.h);
                ymin = Math.min(ymin, current.y);
            }
            start = false;
        }
    });

    return {
        w: xmax - xmin,
        h: ymax - ymin,
    };
};
