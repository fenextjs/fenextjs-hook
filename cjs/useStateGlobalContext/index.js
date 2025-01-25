"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStateGlobalContext = void 0;
const react_1 = require("react");
const useAction_1 = require("../useAction");
const useStateGlobalContext = ({ name, defaultValue, }) => {
    const [data, _setData] = (0, react_1.useState)(defaultValue);
    const { onAction } = (0, useAction_1.useAction)({
        name: `${name ?? ""}`,
        onActionExecute: name
            ? (e) => {
                const w = (window ?? {});
                w[name] = e;
                _setData(e);
            }
            : undefined,
    });
    const setData = (f) => {
        if (name) {
            const n = typeof f == "function" ? f(data) : f;
            onAction(n);
        }
        else {
            _setData(f);
        }
    };
    const onLoadDataAction = () => {
        if (name) {
            const w = (window ?? {});
            const e = w?.[name];
            if (e != undefined) {
                _setData(e);
            }
        }
    };
    (0, react_1.useEffect)(onLoadDataAction, []);
    return {
        data,
        setData,
    };
};
exports.useStateGlobalContext = useStateGlobalContext;
//# sourceMappingURL=index.js.map