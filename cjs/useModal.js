"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
const react_1 = require("react");
const useModal = ({ active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, }) => {
    const [active, setActive] = (0, react_1.useState)(defaultActiveProps ?? false);
    const onChange = (d) => {
        onChangeProps?.(d);
        setActive(d);
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