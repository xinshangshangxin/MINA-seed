
const sheduleStr = `
module.exports = function (fn) {
  setTimeout(fn, 0);
};
`;

const lodashStr = `{
    Array: Array,
    // Buffer: Buffer,
    DataView: DataView,
    Date: Date,
    Error: Error,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    Function: Function,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Int8Array: Int8Array,
    // Map: Map,
    Math: Math,
    Object: Object,
    Promise: Promise,
    RegExp: RegExp,
    // Set: Set,
    String: String,
    // Symbol: Symbol,
    TypeError: TypeError,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Uint8Array: Uint8Array,
    Uint8ClampedArray: Uint8ClampedArray,
    WeakMap: WeakMap,
    // _: _,
    clearTimeout: clearTimeout,
    isFinite: isFinite,
    parseInt: parseInt,
    setTimeout: setTimeout,
  };`;

const obj = {
  npmModules: [{
    src: ['bluebird/js/release/schedule.js'],
    subStr: /[\d\D]*/,
    newStr: sheduleStr,
  }, {
    src: ['lodash/lodash.js'],
    subStr: /var root = freeGlobal.*/,
    newStr: `var root = ${lodashStr}`,
  }],
};

module.exports = obj;
