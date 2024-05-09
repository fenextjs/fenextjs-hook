"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAction = void 0;
const react_1 = require("react");
const fenextjs_functions_1 = require("fenextjs-functions");
const useAction = ({ name, onActionExecute, }) => {
    const uuid = (0, react_1.useMemo)(() => new Date().getTime() + "" + Math.random(), []);
    const id = (0, react_1.useMemo)(() => `fenext-action-element-${name}`, [name]);
    const onChange = (0, react_1.useCallback)((actionElement) => {
        if (!(window && typeof window != "undefined")) {
            return;
        }
        if (actionElement && onActionExecute) {
            let data = actionElement.getAttribute("data-action") ?? "";
            try {
                data = JSON.parse(data);
                data = data?.data;
            }
            catch {
                data = {};
            }
            onActionExecute?.(data);
        }
    }, [onActionExecute]);
    const onLoad = () => {
        if (!(window && typeof window != "undefined")) {
            setTimeout(onLoad, 500);
            return;
        }
        let actionElement = document.getElementById(id);
        if (!actionElement) {
            actionElement = document.createElement("input");
            actionElement.id = id;
            actionElement.type = "checkbox";
            actionElement.setAttribute("style", "position: fixed;scale: 0;");
            document.body.append(actionElement);
        }
        actionElement = document.getElementById(id);
        if (onActionExecute) {
            actionElement.onchangeuuid ??= {};
            actionElement.onchangeuuid[uuid] = (e) => {
                onChange(e.target);
            };
            actionElement.onchange = (e) => {
                const ele = e.target;
                Object.values(ele?.onchangeuuid ?? {}).map((f) => {
                    f?.(e);
                });
                actionElement?.removeAttribute("data-action");
            };
        }
    };
    (0, react_1.useEffect)(onLoad, [name, onActionExecute, uuid]);
    const onAction = (data) => {
        const actionElement = document.getElementById(id);
        if (actionElement) {
            actionElement.setAttribute("data-action", (0, fenextjs_functions_1.stringifyCircular)({ data }));
            actionElement.click();
        }
    };
    return {
        onAction,
    };
};
exports.useAction = useAction;
//# sourceMappingURL=useAction.js.map