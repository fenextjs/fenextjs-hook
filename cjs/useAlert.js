"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAlert = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const uselocalstoragenextjs_1 = tslib_1.__importDefault(require("uselocalstoragenextjs"));
const useAlert = ({ name = "fenextjs-alert", onClearWindowBeforeUnload = true, onClearWindowHasChange = true, }) => {
    const { load, value: alert, setLocalStorage: setAlert, onClearLocalStorage: onClearAlert, } = (0, uselocalstoragenextjs_1.default)({
        name,
        defaultValue: undefined,
        parse: (v) => {
            try {
                return JSON.parse(v);
            }
            catch {
                return undefined;
            }
        },
    });
    const onBeforeUnload = (0, react_1.useCallback)(() => {
        if (onClearWindowBeforeUnload) {
            onClearAlert();
        }
    }, [onClearWindowBeforeUnload]);
    const onHasChange = (0, react_1.useCallback)(() => {
        if (onClearWindowHasChange) {
            onClearAlert();
        }
    }, [onClearWindowHasChange]);
    const onUnLoadWindowListener = () => {
        window.removeEventListener("beforeunload", onBeforeUnload);
        window.removeEventListener("haschange", onHasChange);
    };
    const onUnloadLoadAlert = () => {
        if (typeof window == "undefined") {
            setTimeout(onUnloadLoadAlert, 500);
            return;
        }
        onUnLoadWindowListener();
    };
    const onLoadWindowListener = () => {
        window.addEventListener("beforeunload", onBeforeUnload);
        window.addEventListener("haschange", onHasChange);
    };
    const onLoadAlert = () => {
        if (typeof window == "undefined") {
            setTimeout(onLoadAlert, 500);
            return;
        }
        onLoadWindowListener();
        return () => {
            onUnloadLoadAlert();
        };
    };
    (0, react_1.useEffect)(onLoadAlert, []);
    return {
        load,
        alert,
        setAlert: (e) => {
            setAlert(e);
        },
        onClearAlert,
    };
};
exports.useAlert = useAlert;
//# sourceMappingURL=useAlert.js.map