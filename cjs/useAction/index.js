"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAction = void 0;
const fenextjs_functions_1 = require("fenextjs-functions");
const react_1 = require("react");
const useAction = ({ name, onActionExecute, env_log: env_log_boolean, }) => {
    const NAME_ACTION = `fenext-action-element-${name}`;
    const actionRef = (0, react_1.useRef)(onActionExecute);
    const ACTION = (e) => {
        const data = e?.detail;
        if (env_log_boolean?.onActionExecute === true) {
            (0, fenextjs_functions_1.env_log)(data, {
                name: `${NAME_ACTION}-onActionExecute`,
            });
        }
        actionRef.current?.(data);
    };
    const onUnload = () => {
        if (!(window && typeof window != "undefined")) {
            return;
        }
        window.removeEventListener(NAME_ACTION, ACTION);
    };
    const onLoad = () => {
        if (!(window && typeof window != "undefined")) {
            setTimeout(onLoad, 500);
            return;
        }
        if (onActionExecute) {
            window.addEventListener(NAME_ACTION, ACTION);
        }
        return onUnload;
    };
    (0, react_1.useEffect)(onLoad, [onActionExecute]);
    const onAction = (detail) => {
        if (env_log_boolean?.onAction === true) {
            (0, fenextjs_functions_1.env_log)(detail, {
                name: `${NAME_ACTION}-onAction`,
            });
        }
        window.dispatchEvent(new CustomEvent(NAME_ACTION, {
            bubbles: true,
            detail,
        }));
    };
    return {
        onAction,
    };
};
exports.useAction = useAction;
//# sourceMappingURL=index.js.map