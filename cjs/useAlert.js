"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAlert = void 0;
const react_1 = require("react");
const useAction_1 = require("./useAction");
const useAlert = ({ name = "fenextjs-alert", }) => {
    const [alert, setAlert] = (0, react_1.useState)(undefined);
    const { onAction } = (0, useAction_1.useAction)({
        name,
        onActionExecute: setAlert,
    });
    return {
        alert,
        setAlert: onAction,
        onClearAlert: () => {
            onAction(undefined);
        },
    };
};
exports.useAlert = useAlert;
//# sourceMappingURL=useAlert.js.map