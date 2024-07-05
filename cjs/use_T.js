"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use_T = void 0;
const fenextjs_functions_1 = require("fenextjs-functions");
const react_1 = require("react");
const use_T = ({ _t: _tProps, useT = true }) => {
    const _t = (0, react_1.useCallback)((message) => (0, fenextjs_functions_1._tValidate)(message, useT !== false ? _tProps : undefined), [_tProps, useT]);
    return {
        _t,
    };
};
exports.use_T = use_T;
//# sourceMappingURL=use_T.js.map