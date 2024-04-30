"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
const react_1 = require("react");
const useAction_1 = require("./useAction");
const uselocalstoragenextjs_1 = require("uselocalstoragenextjs");
const useModal = ({ name, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, disabled = false, activeByNameLocalStorage = false, }) => {
    const [active, setActive] = (0, react_1.useState)(defaultActiveProps ?? false);
    const { value, setLocalStorage } = (0, uselocalstoragenextjs_1.useLocalStorage)({
        name: "fenext-modal-active-name",
        parse: (e) => {
            try {
                return JSON.parse(e ?? "[]");
            }
            catch {
                return [];
            }
        },
        defaultValue: [],
    });
    const onLoadWindows = () => {
        if (!(window && typeof window != "undefined")) {
            return;
        }
        window.addEventListener("beforeunload", () => {
            setLocalStorage([]);
        });
    };
    (0, react_1.useEffect)(onLoadWindows, []);
    const namesLocalStorage = (0, react_1.useMemo)(() => (value ? [value].flat(2) : []), [value]);
    const onPush = (name) => {
        if (name && activeByNameLocalStorage) {
            const n = [...(namesLocalStorage ?? []), name];
            setLocalStorage(n);
        }
    };
    const onPop = (name) => {
        if (name && activeByNameLocalStorage) {
            const n = [...(namesLocalStorage ?? [])].filter((e) => e != name);
            setLocalStorage(n);
        }
    };
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
        if (d) {
            onPush(name);
        }
        else {
            onPop(name);
        }
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
    const activeFinal = (0, react_1.useMemo)(() => {
        if (activeByNameLocalStorage && name && namesLocalStorage.at(-1)) {
            return namesLocalStorage.at(-1) == name;
        }
        return activeProps ?? active;
    }, [
        activeByNameLocalStorage,
        namesLocalStorage,
        name,
        activeProps,
        active,
    ]);
    return {
        active: activeFinal,
        onChange,
        onActive,
        onClose,
    };
};
exports.useModal = useModal;
//# sourceMappingURL=useModal.js.map