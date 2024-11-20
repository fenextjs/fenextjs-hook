"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const useLocalStorage = (props) => {
    const { name, defaultValue, parse, updateValue } = (0, react_1.useMemo)(() => ({
        parse: (v) => v,
        updateValue: (o, n) => {
            o;
            return n;
        },
        ...props,
    }), [props]);
    const [load, setLoad] = (0, react_1.useState)(false);
    const [value, setValue] = (0, react_1.useState)();
    const onListenerStorage = () => {
        window.addEventListener("storage", (e) => {
            if (e.key == name) {
                onLoadValue();
            }
        });
    };
    const getLocalStorage = () => {
        const valueLocal = window.localStorage.getItem(name);
        return valueLocal ? parse(valueLocal) : defaultValue;
    };
    const onLoadValue = () => {
        const valueLocal = getLocalStorage();
        setValue(valueLocal);
        setLoad(true);
        return valueLocal;
    };
    const updateLocalStorage = (newValue) => {
        if (typeof newValue == "object") {
            newValue = JSON.stringify(newValue);
        }
        window.localStorage.setItem(name, newValue);
        window.dispatchEvent(new StorageEvent("storage", {
            key: name,
        }));
    };
    const setLocalStorage = (newValue) => {
        const oldValue = getLocalStorage();
        const nValue = updateValue(oldValue, newValue);
        setValue(nValue);
        updateLocalStorage(nValue);
    };
    const onClearLocalStorage = () => {
        window.localStorage.removeItem(name);
        setValue(undefined);
    };
    (0, react_1.useEffect)(() => {
        onLoadValue();
        onListenerStorage();
    }, []);
    return {
        load,
        value,
        setLocalStorage,
        onClearLocalStorage,
    };
};
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=index.js.map