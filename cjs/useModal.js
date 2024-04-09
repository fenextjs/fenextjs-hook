"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
const react_1 = require("react");
const useAction_1 = require("./useAction");
const useModal = ({ name, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, }) => {
    const [active, setActive] = (0, react_1.useState)(defaultActiveProps ?? false);
    const { onAction } = (0, useAction_1.useAction)({
        name: name ?? "fenext-modal",
        onActionExecute: name
            ? (e) => {
                setActive(e ?? false);
            }
            : undefined,
    });
    const onChange = (d) => {
        onChangeProps?.(d);
        setActive(d);
        onAction(d);
    };
    const onActive = () => {
        onChange(true);
        onActiveProps?.();
    };
    const onClose = () => {
        onChange(false);
        onCloseProps?.();
    };
    return {
        active: activeProps ?? active,
        onChange,
        onActive,
        onClose,
    };
};
exports.useModal = useModal;
//# sourceMappingURL=useModal.js.map