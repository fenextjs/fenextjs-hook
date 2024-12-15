"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActionDropDown = void 0;
const useAction_1 = require("../useAction");
const useActionDropDown = ({ name, onChange, }) => {
    const { onAction } = (0, useAction_1.useAction)({
        name: `fenext-dropdown-${name ?? ""}`,
        onActionExecute: name != undefined ? onChange : undefined,
    });
    return {
        onClose: () => {
            onAction(false);
        },
        onActive: () => {
            onAction(true);
        },
        onToogle: () => {
            onAction();
        },
    };
};
exports.useActionDropDown = useActionDropDown;
//# sourceMappingURL=index.js.map