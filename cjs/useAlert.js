"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAlert = void 0;
const tslib_1 = require("tslib");
const uselocalstoragenextjs_1 = tslib_1.__importDefault(require("uselocalstoragenextjs"));
const useAlert = ({}) => {
    const { load, value: alert, setLocalStorage: setAlert, onClearLocalStorage: onClearAlert, } = (0, uselocalstoragenextjs_1.default)({
        name: "fenextjs-alert",
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
    window.addEventListener("beforeunload", () => {
        onClearAlert();
    });
    window.addEventListener("haschange", () => {
        onClearAlert();
    });
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