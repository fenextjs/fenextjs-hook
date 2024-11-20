import { useEffect, useMemo, useState } from "react";

export interface useLocalStorageProps<T = any, O = any> {
    name: string;
    defaultValue?: T;
    parse?: (value: any) => T;
    updateValue?: (oldValue: O, newValue: T) => T;
}

export const useLocalStorage = <T = any, O = any>(
    props: useLocalStorageProps<T, O>,
) => {
    const { name, defaultValue, parse, updateValue } = useMemo(
        () => ({
            parse: (v: any) => v,
            updateValue: (o: O, n: T) => {
                o;
                return n;
            },
            ...props,
        }),
        [props],
    );

    const [load, setLoad] = useState(false);
    const [value, setValue] = useState<T>();

    const onListenerStorage = () => {
        window.addEventListener("storage", (e) => {
            if (e.key == name) {
                onLoadValue();
            }
        });
    };
    const getLocalStorage = () => {
        const valueLocal: any = window.localStorage.getItem(name);
        return valueLocal ? parse(valueLocal) : defaultValue;
    };
    const onLoadValue = () => {
        const valueLocal = getLocalStorage();
        setValue(valueLocal);
        setLoad(true);
        return valueLocal;
    };

    const updateLocalStorage = (newValue: any) => {
        if (typeof newValue == "object") {
            newValue = JSON.stringify(newValue);
        }
        window.localStorage.setItem(name, newValue);
        window.dispatchEvent(
            new StorageEvent("storage", {
                key: name,
            }),
        );
    };
    const setLocalStorage = (newValue: any) => {
        const oldValue = getLocalStorage();
        const nValue = updateValue(oldValue, newValue);
        setValue(nValue);
        updateLocalStorage(nValue);
    };

    const onClearLocalStorage = () => {
        window.localStorage.removeItem(name);
        setValue(undefined);
    };

    useEffect(() => {
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
