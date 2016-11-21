export function promisify<T>(f: (cb: (err: any, res: T) => void) => void): () => Promise<T>;
export function promisify<A,T>(f: (arg: A, cb: (err: any, res: T) => void) => void): (arg: A) => Promise<T>;
export function promisify<A,A2,T>(f: (arg: A, arg2: A2, cb: (err: any, res: T) => void) => void): (arg: A, arg2: A2) => Promise<T>;
export function promisify<A,A2,A3,T>(f: (arg: A, arg2: A2, arg3: A3, cb: (err: any, res: T) => void) => void): (arg: A, arg2: A2, arg3: A3) => Promise<T>;
export function promisify<A,A2,A3,A4,T>(f: (arg: A, arg2: A2, arg3: A3, arg4: A4, cb: (err: any, res: T) => void) => void): (arg: A, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;

export function promisify(f) {
    return function() {
        return new Promise((resolve, reject) => {
            var args = Array.prototype.slice.call(arguments);
            args.push((err, result) => err !== null ? reject(err) : resolve(result));
            f.apply(null, args);
        });
    }
}

export function promisifyArray<T>(f: (cb: (err: any, res: T) => void) => void): () => Promise<{0: T}>;
export function promisifyArray<A,T>(f: (arg: A, cb: (err: any, res: T) => void) => void): (arg: A) => Promise<{0: T}>;
export function promisifyArray<A,T,T2>(f: (arg: A, cb: (err: any, res: T, res2: T2) => void) => void): (arg: A) => Promise<{0: T, 1: T2}>;
export function promisifyArray<A,T,T2,T3>(f: (arg: A, cb: (err: any, res: T, res2: T2, res3: T3) => void) => void): (arg: A) => Promise<{0: T, 1: T2}>;
export function promisifyArray<A,T,T2,T3,T4>(f: (arg: A, cb: (err: any, res: T, res2: T2, res3: T3, res4: T4) => void) => void): (arg: A) => Promise<{0: T, 1: T4}>;
export function promisifyArray<A,T,T2,T3,T4,T5>(f: (arg: A, cb: (err: any, res: T, res2: T2, res3: T3, res4: T4, res5: T5) => void) => void): (arg: A) => Promise<{0: T, 1: T5}>;
export function promisifyArray<A,A2,T>(f: (arg: A, arg2: A2, cb: (err: any, res: T) => void) => void): (arg: A, arg2: A2) => Promise<T>;
export function promisifyArray<A,A2,A3,T>(f: (arg: A, arg2: A2, arg3: A3, cb: (err: any, res: T) => void) => void): (arg: A, arg2: A2, arg3: A3) => Promise<T>;
export function promisifyArray<A,A2,A3,A4,T>(f: (arg: A, arg2: A2, arg3: A3, arg4: A4, cb: (err: any, res: T) => void) => void): (arg: A, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;

export function promisifyArray(f) {
    return function() {
        return new Promise((resolve, reject) => {
            var args = Array.prototype.slice.call(arguments);
            args.push((err, ...params) => err !== null ? reject(err) : resolve(params));
            f.apply(null, args);
        });
    }
}

export function map<T,U>(elts: PromiseLike<PromiseLike<T>[]>, f: (T) => U | PromiseLike<U>): Promise<U[]>;
export function map<T,U>(elts: PromiseLike<T[]>, f: (T) => U | PromiseLike<U>): Promise<U[]>;
export function map<T,U>(elts: PromiseLike<T>[], f: (T) => U | PromiseLike<U>): Promise<U[]>;
export function map<T,U>(elts: T[], f: (T) => U | PromiseLike<U>): Promise<U[]>;

// TODO support iterators
export function map(elts, f) {
    var apply = elts => Promise.all(elts.map(elt => typeof elt.then === 'function' ? elt.then(f) : f(elt)));
    return typeof elts.then === 'function' ? elts.then(apply) : apply(elts);
}

export function _try<T>(f: () => T): Promise<T>;
export function _try<T>(f: (arg: any) => T, arg: any): Promise<T>;
export function _try<T>(f: (arg: any, arg2: any) => T, arg: any, arg2: any): Promise<T>;
export function _try<T>(f: (arg: any, arg2: any, arg3: any) => T, arg: any, arg2: any, arg3: any): Promise<T>;
export function _try<T>(f: (arg: any, arg2: any, arg3: any, arg4: any) => T, arg: any, arg2: any, arg3: any, arg4: any): Promise<T>;

export function _try(f) {
    return new Promise((res, rej) => {
        try {
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            res(f.apply(null, args));
        } catch (err) {
            rej(err);
        }
    });
}
