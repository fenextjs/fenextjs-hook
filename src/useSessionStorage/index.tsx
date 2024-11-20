import { useEffect, useMemo, useState } from "react";

export interface useSessionStorageProps<T = any, O = any> {
    name: string;
    defaultValue?: T;
    parse?: (value: any) => T;
    updateValue?: (oldValue: O, newValue: T) => T;
}

export const useSessionStorage = <T = any, O = any>(
    props: useSessionStorageProps<T, O>,
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
        window.addEventListener("sessionStorage", (e) => {
            if ((e as any).key == name) {
                onLoadValue();
            }
        });
    };
    const getSessionStorage = () => {
        const valueSession: any = window.sessionStorage.getItem(name);
        return valueSession ? parse(valueSession) : defaultValue;
    };
    const onLoadValue = () => {
        const valueSession = getSessionStorage();
        setValue(valueSession);
        setLoad(true);
        return valueSession;
    };

    const updateSessionStorage = (newValue: any) => {
        if (typeof newValue == "object") {
            newValue = JSON.stringify(newValue);
        }
        window.sessionStorage.setItem(name, newValue);
        window.dispatchEvent(
            new StorageEvent("sessionStorage", {
                key: name,
            }),
        );
    };
    const setSessionStorage = (newValue: any) => {
        const oldValue = getSessionStorage();
        const nValue = updateValue(oldValue, newValue);
        setValue(nValue);
        updateSessionStorage(nValue);
    };

    const onClearSessionStorage = () => {
        window.sessionStorage.removeItem(name);
        setValue(undefined);
    };

    useEffect(() => {
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
