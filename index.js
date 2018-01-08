"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promisify(f) {
    return function () {
        return new Promise((resolve, reject) => {
            var args = Array.prototype.slice.call(arguments);
            args.push((err, result) => err !== null ? reject(err) : resolve(result));
            f.apply(null, args);
        });
    };
}
exports.promisify = promisify;
function promisifyArray(f) {
    return function () {
        return new Promise((resolve, reject) => {
            var args = Array.prototype.slice.call(arguments);
            args.push((err, ...params) => err !== null ? reject(err) : resolve(params));
            f.apply(null, args);
        });
    };
}
exports.promisifyArray = promisifyArray;
// TODO support iterators
function map(elts, f) {
    var apply = elts => Promise.all(elts.map(elt => typeof elt.then === 'function' ? elt.then(f) : f(elt)));
    return typeof elts.then === 'function' ? elts.then(apply) : apply(elts);
}
exports.map = map;
function _try(f) {
    return new Promise((res, rej) => {
        try {
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            res(f.apply(null, args));
        }
        catch (err) {
            rej(err);
        }
    });
}
exports._try = _try;
//# sourceMappingURL=index.js.map