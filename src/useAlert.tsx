import { AlertProps } from "fenextjs-interface";
import { useCallback, useEffect } from "react";
import useLocalStorage from "uselocalstoragenextjs";

export interface useAlertProps {
    name?: string;
    onClearWindowBeforeUnload?: boolean;
    onClearWindowHasChange?: boolean;
}

export const useAlert = <T = any,>({
    name = "fenextjs-alert",
    onClearWindowBeforeUnload = true,
    onClearWindowHasChange = true,
}: useAlertProps) => {
    const {
        load,
        value: alert,
        setLocalStorage: setAlert,
        onClearLocalStorage: onClearAlert,
    } = useLocalStorage<AlertProps<T>>({
        name,
        defaultValue: undefined,
        parse: (v: any) => {
            try {
                return JSON.parse(v);
            } catch {
                return undefined;
            }
        },
    });

    const onBeforeUnload = useCallback(() => {
        if (onClearWindowBeforeUnload) {
            onClearAlert();
        }
    }, [onClearWindowBeforeUnload]);

    const onHasChange = useCallback(() => {
        if (onClearWindowHasChange) {
            onClearAlert();
        }
    }, [onClearWindowHasChange]);

    const onUnLoadWindowListener = () => {
        window.removeEventListener("beforeunload", onBeforeUnload);
        window.removeEventListener("haschange", onHasChange);
    };

    const onUnloadLoadAlert = () => {
        if (typeof window == "undefined") {
            setTimeout(onUnloadLoadAlert, 500);
            return;
        }
        onUnLoadWindowListener();
    };
    const onLoadWindowListener = () => {
        window.addEventListener("beforeunload", onBeforeUnload);
        window.addEventListener("haschange", onHasChange);
    };
    const onLoadAlert = () => {
        if (typeof window == "undefined") {
            setTimeout(onLoadAlert, 500);
            return;
        }
        onLoadWindowListener();
        return () => {
            onUnloadLoadAlert();
        };
    };
    useEffect(onLoadAlert, []);

    return {
        load,
        alert,
        setAlert: (e: AlertProps<T>) => {
            setAlert(e);
        },
        onClearAlert,
    };
};
