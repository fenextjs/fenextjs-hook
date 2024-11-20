"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionStorage = void 0;
const react_1 = require("react");
const useSessionStorage = (props) => {
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
        window.addEventListener("sessionStorage", (e) => {
            if (e.key == name) {
                onLoadValue();
            }
        });
    };
    const getSessionStorage = () => {
        const valueSession = window.sessionStorage.getItem(name);
        return valueSession ? parse(valueSession) : defaultValue;
    };
    const onLoadValue = () => {
        const valueSession = getSessionStorage();
        setValue(valueSession);
        setLoad(true);
        return valueSession;
    };
    const updateSessionStorage = (newValue) => {
        if (typeof newValue == "object") {
            newValue = JSON.stringify(newValue);
        }
        window.sessionStorage.setItem(name, newValue);
        window.dispatchEvent(new StorageEvent("sessionStorage", {
            key: name,
        }));
    };
    const setSessionStorage = (newValue) => {
        const oldValue = getSessionStorage();
        const nValue = updateValue(oldValue, newValue);
        setValue(nValue);
        updateSessionStorage(nValue);
    };
    const onClearSessionStorage = () => {
        window.sessionStorage.removeItem(name);
        setValue(undefined);
    };
    (0, react_1.useEffect)(() => {
        onLoadValue();
        onListenerStorage();
    }, []);
    return {
        load,
        value,
        setSessionStorage,
        onClearSessionStorage,
    };
};
exports.useSessionStorage = useSessionStorage;
//# sourceMappingURL=index.js.map