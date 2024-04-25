"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
const react_1 = require("react");
const useAction_1 = require("./useAction");
const uselocalstoragenextjs_1 = require("uselocalstoragenextjs");
const useModal = ({ name, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, disabled = false, activeByNameLocalStorage = false, }) => {
    const [active, setActive] = (0, react_1.useState)(defaultActiveProps ?? false);
    const { value: nameLocalStorage, setLocalStorage } = (0, uselocalstoragenextjs_1.useLocalStorage)({
        name: "fenext-modal-active-name",
        parse: (e) => e,
        defaultValue: "-1",
    });
    const { onAction } = (0, useAction_1.useAction)({
        name: name ?? "fenext-modal",
        onActionExecute: name
            ? (e) => {
                setActive(e ?? false);
            }
            : undefined,
    });
    const onChange = (d) => {
        if (disabled) {
            return;
        }
        setLocalStorage(d ? name : "-1");
        onChangeProps?.(d);
        setActive(d);
        onAction(d);
    };
    const onActive = () => {
        if (disabled) {
            return;
        }
        onChange(true);
        onActiveProps?.();
    };
    const onClose = () => {
        if (disabled) {
            return;
        }
        onChange(false);
        onCloseProps?.();
    };
    return {
        active: activeByNameLocalStorage
            ? nameLocalStorage == name
            : activeProps ?? active,
        onChange,
        onActive,
        onClose,
    };
};
exports.useModal = useModal;
//# sourceMappingURL=useModal.js.map