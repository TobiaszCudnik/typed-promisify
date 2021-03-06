import * as assert from 'assert';
import {promisify, map} from './index';

describe('promisify', function() {
    function f(cb) {
        cb(null, 'f');
    }

    function fe(cb) {
        cb('error', null);
    }

    function fa(a, cb) {
        cb(null, 'f' + a);
    }

    function fae(a, cb) {
        cb('error', null);
    }

    it('function with no args', function() {
        return promisify(f)()
        .then(res => {
            assert.equal(res, 'f');
        });
    });

    it('function with no args throws exception', function() {
        return promisify(fe)()
        .then(res => {
            throw new Error('expected an exception');
        })
        .catch(err => {
            assert.equal(err, 'error');
        });
    });

    it('function with one arg', function() {
        return promisify(fa)('a')
        .then(res => {
            assert.equal(res, 'fa');
        });
    });

    it('function with one arg throws exception', function() {
        return promisify(fae)('a')
        .then(res => {
            throw new Error('expected an exception');
        })
        .catch(err => {
            assert.equal(err, 'error');
        });
    });
});

describe('map', function() {
    var elts = [1, 2, 3];
    var f: (n) => Promise<number> = n => new Promise((res,rej) => res(n * n));
    var expected = [1, 4, 9];

    it('array of values', function() {
        return map(elts, f)
        .then(res => assert.deepEqual(res, expected));
    });

    it('array of promises', function() {
        var eltps = elts.map(elt => new Promise((res, rej) => res(elt)));
        return map(eltps, f)
        .then(res => assert.deepEqual(res, expected));
    });

    it('promise of array of values', function() {
        var pelts = new Promise((res,rej) => res(elts));
        return map(pelts, f)
        .then(res => assert.deepEqual(res, expected));
    });

    it('promise of array of promises', function() {
        var peltps = new Promise((res,rej) => res(elts.map(elt => new Promise((res, rej) => res(elt)))));
        return map(peltps, f)
        .then(res => assert.deepEqual(res, expected));
    });
});
