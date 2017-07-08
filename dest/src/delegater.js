"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateArgument = function (_a) {
    var target = _a.target, message = _a.message;
    var acceptable = target && (typeof target === 'object' || typeof target === 'function');
    if (!acceptable) {
        throw new TypeError("[delegate-js] " + message);
    }
};
var delegating = function (destructive, delegated) {
    var _this = this;
    var properties = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        properties[_i - 2] = arguments[_i];
    }
    validateArgument({
        target: delegated,
        message: "delegated object must not be undefined or null, but actualy " + delegated
    });
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
    validateArgument({
        target: self,
        message: JSON.stringify(self) + " is not acceptable. accept only object."
    });
    return {
        to: delegating.bind(Object.create(self), false),
        self: self
    };
};
exports.$delegate = function (self) {
    validateArgument({
        target: self,
        message: JSON.stringify(self) + " is not acceptable. accept only object."
    });
    return {
        to: delegating.bind(self, true)
    };
};
