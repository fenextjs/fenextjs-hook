"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
const react_1 = require("react");
const useAction_1 = require("./useAction");
const uselocalstoragenextjs_1 = require("uselocalstoragenextjs");
const useModal = ({ name, nameLocalStorage, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, disabled = false, activeByNameLocalStorage = false, activeByNameContentLocalStorage = false, }) => {
    const [ifReload, setIfReload] = (0, react_1.useState)(false);
    const [active, setActive] = (0, react_1.useState)(defaultActiveProps ?? false);
    const { value, setLocalStorage } = (0, uselocalstoragenextjs_1.useLocalStorage)({
        name: nameLocalStorage ?? "fenext-modal-active-name",
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
            setActive(false);
            setIfReload(true);
        });
    };
    (0, react_1.useEffect)(onLoadWindows, []);
    const listNamesLocalStorage = (0, react_1.useMemo)(() => (value ? [value].flat(2) : []), [value]);
    const onPush = (name) => {
        if (name &&
            (activeByNameLocalStorage || activeByNameContentLocalStorage)) {
            const n = [...(listNamesLocalStorage ?? []), name];
            setLocalStorage(n);
        }
    };
    const onPop = (name) => {
        if (name &&
            (activeByNameLocalStorage || activeByNameContentLocalStorage)) {
            const n = [...(listNamesLocalStorage ?? [])];
            if (n.at(-1) === name) {
                n.pop();
            }
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
    const { activeFinal, activeNameLast, activeName } = (0, react_1.useMemo)(() => {
        let ACTIVE = undefined;
        const ACTIVENAME = listNamesLocalStorage.includes(name ?? "");
        const ACTIVENAMELAST = listNamesLocalStorage.at(-1) == name;
        if (activeByNameContentLocalStorage && name) {
            ACTIVE = ACTIVENAME;
        }
        if (activeByNameLocalStorage && name && listNamesLocalStorage.at(-1)) {
            ACTIVE = ACTIVENAMELAST;
        }
        return {
            activeFinal: ACTIVE ?? activeProps ?? active,
            activeName: ACTIVENAME,
            activeNameLast: ACTIVENAMELAST,
        };
    }, [
        activeByNameContentLocalStorage,
        activeByNameLocalStorage,
        listNamesLocalStorage,
        name,
        activeProps,
        active,
    ]);
    return {
        active: !ifReload && activeFinal,
        activeNameLast,
        activeName,
        listNamesLocalStorage,
        onChange,
        onActive,
        onClose,
    };
};
exports.useModal = useModal;
//# sourceMappingURL=useModal.js.map