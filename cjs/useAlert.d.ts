import { AlertProps } from "fenextjs-interface";
export interface useAlertProps {
    name?: string;
    onClearWindowBeforeUnload?: boolean;
    onClearWindowHasChange?: boolean;
}
export declare const useAlert: <T = any>({ name, onClearWindowBeforeUnload, onClearWindowHasChange, }: useAlertProps) => {
    load: boolean;
    alert: AlertProps<T> | undefined;
    setAlert: (e: AlertProps<T>) => void;
    onClearAlert: () => void;
};
