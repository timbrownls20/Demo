"use strict";
///<reference path="./index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Linq;
(function (Linq) {
    // interface Array<T> {
    //     firstOrDefault(predicate: Function): T;
    //   }
    //let test :Guid = new Guid();
    Array.prototype.firstOrDefault = function (predicate) {
        return this.reduce(function (accumulator, currentValue) {
            if (!accumulator && predicate(currentValue))
                accumulator = currentValue;
            return accumulator;
        }, null);
    };
})(Linq = exports.Linq || (exports.Linq = {}));
//# sourceMappingURL=linq.js.map