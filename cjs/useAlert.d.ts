import { AlertProps } from "fenextjs-interface";
export interface useAlertProps {
    name?: string;
}
export declare const useAlert: <T = any>({ name, }: useAlertProps) => {
    alert: AlertProps<T> | undefined;
    setAlert: (data?: AlertProps<T> | undefined) => void;
    onClearAlert: () => void;
};
