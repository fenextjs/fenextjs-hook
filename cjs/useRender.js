"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRender = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const useRender = ({ children, ref }) => {
    const uuid = (0, react_1.useMemo)(() => `${Math.ceil(new Date().getTime() * Math.random())}`, []);
    const onLoadChildren = () => {
        if (ref) {
            ref.setAttribute("uuid", uuid);
            ReactDOM.render(react_1.default.createElement(react_1.default.Fragment, null, children), ref);
        }
    };
    (0, react_1.useEffect)(onLoadChildren, [children, ref, uuid]);
    return {
        ref,
        uuid,
    };
};
exports.useRender = useRender;
//# sourceMappingURL=useRender.js.map