import { AlertProps } from "fenextjs-interface";
import { useState } from "react";
import { useAction } from "../useAction";

export interface useAlertProps {
    name?: string;
}

export const useAlert = <T = any,>({
    name = "fenextjs-alert",
}: useAlertProps) => {
    const [alert, setAlert] = useState<AlertProps<T> | undefined>(undefined);
    const { onAction } = useAction<AlertProps<T>>({
        name,
        onActionExecute: setAlert,
    });

    return {
        alert,
        setAlert: onAction,
        onClearAlert: () => {
            onAction(undefined);
        },
    };
};
