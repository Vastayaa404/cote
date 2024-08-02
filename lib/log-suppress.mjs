class LogSuppress {
    constructor() { }
    init(console, env) {
        if (process.env.NODE_ENV === 'dev' ||
            process.env.NODE_ENV === env) {
            if (typeof console.log == 'function') {
                console.log = function () { };
                console.log('You should not see me');
            }
        }
    }
}

export default new LogSuppress();