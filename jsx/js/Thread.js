class Thread {
    static run(callback, setup = {}) {
        const p = {
            interval: 0,
            iter: 10,
            ...setup,
        };
        const buffer = {};
        let h;
        return new Promise((ok, err) => {
            buffer.start = true;
            let step = 0;
            buffer.step = step;
            h = setInterval(() => {
                for (let i = 0; i < p.iter; i++) {
                    const res = callback(buffer);
                    if (res) {
                        clearInterval(h);
                        ok(res);
                    }
                    buffer.start = false;
                    step += 1;
                    buffer.step = step;
                }
            }, p.interval);
        });
    }
}

export default Thread;
