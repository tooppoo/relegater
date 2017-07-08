"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delegating = function (destructive, delegated) {
    var _this = this;
    var properties = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        properties[_i - 2] = arguments[_i];
    }
    var acceptable = (typeof this === 'object' || typeof this === 'function');
    if (!acceptable) {
        throw new TypeError("[delegate-js] " + JSON.stringify(this) + " is not acceptable, only object or function");
    }
    if (!delegated) {
        throw new TypeError("[delegate-js] delegated object must not be undefined or null");
    }
    properties.forEach(function (property) {
        var targetProp = delegated[property];
        if (targetProp === undefined) {
            return;
        }
        Object.defineProperty(_this, property, {
            get: function () { return delegated[property]; },
            configurable: false
        });
    });
    return destructive ? exports.$delegate(this) : exports.delegate(this);
};
exports.delegate = function (self) {
    return {
        to: delegating.bind(Object.create(self), false),
        self: self
    };
};
exports.$delegate = function (self) {
    return {
        to: delegating.bind(self, true)
    };
};
