export default (dom, eventName, callback) => {
    dom.addEventListener(eventName, callback);
    return () => {
        dom.removeEventListener(eventName, callback);
    };
};
