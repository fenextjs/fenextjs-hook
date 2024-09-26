import { AlertProps } from "fenextjs-interface";
export interface useAlertProps {
    name?: string;
}
export declare const useAlert: <T = any>({ name, }: useAlertProps) => {
    alert: AlertProps<T> | undefined;
    setAlert: (detail?: AlertProps<T> | undefined) => void;
    onClearAlert: () => void;
};
