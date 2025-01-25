import { SetStateAction, useEffect, useState } from "react";
import { useAction } from "../useAction";

export interface useStateGlobalContextProps<T> {
    defaultValue: T;
    name?: string;
}

export const useStateGlobalContext = <T,>({
    name,
    defaultValue,
}: useStateGlobalContextProps<T>) => {
    const [data, _setData] = useState<T>(defaultValue);
    const { onAction } = useAction<T>({
        name: `${name ?? ""}`,
        onActionExecute: name
            ? (e) => {
                  const w = (window ?? {}) as any;
                  w[name] = e;
                  _setData(e as T);
              }
            : undefined,
    });
    const setData = (f: SetStateAction<T>) => {
        if (name) {
            const n = typeof f == "function" ? (f as any)(data) : f;
            onAction(n);
        } else {
            _setData(f);
        }
    };
    const onLoadDataAction = () => {
        if (name) {
            const w = (window ?? {}) as any;
            const e = w?.[name];
            if (e != undefined) {
                _setData(e as T);
            }
        }
    };
    useEffect(onLoadDataAction, []);
    return {
        data,
        setData,
    };
};
