"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAction = void 0;
const fenextjs_functions_1 = require("fenextjs-functions");
const react_1 = require("react");
const useAction = ({ name, onActionExecute, env_log: env_log_boolean, }) => {
    const onLoad = () => {
        if (!(window && typeof window != "undefined")) {
            setTimeout(onLoad, 500);
            return;
        }
        if (onActionExecute) {
            window.addEventListener(`fenext-action-element-${name}`, (e) => {
                const data = e?.detail;
                if (env_log_boolean?.onActionExecute === true) {
                    (0, fenextjs_functions_1.env_log)(data, {
                        name: `fenext-action-element-${name}-onActionExecute`,
                    });
                }
                onActionExecute?.(data);
            }, false);
        }
    };
    (0, react_1.useEffect)(onLoad, [onActionExecute]);
    const onAction = (detail) => {
        if (env_log_boolean?.onAction === true) {
            (0, fenextjs_functions_1.env_log)(detail, {
                name: `fenext-action-element-${name}-onAction`,
            });
        }
        window.dispatchEvent(new CustomEvent(`fenext-action-element-${name}`, {
            bubbles: true,
            detail,
        }));
    };
    return {
        onAction,
    };
};
exports.useAction = useAction;
//# sourceMappingURL=useAction.js.map