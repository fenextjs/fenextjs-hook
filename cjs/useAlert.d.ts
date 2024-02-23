export interface useAlertProps {
}
export declare const useAlert: ({}: useAlertProps) => {
    load: boolean;
    alert: any;
    setAlert: (e: AlertProps) => void;
    onClearAlert: () => void;
};
