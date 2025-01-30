export interface onApiErrorData {
    message: string;
}
export interface useApiErrorProps {
    onActionExecute?: (data?: onApiErrorData) => void;
}
export declare const useApiError: ({ onActionExecute }: useApiErrorProps) => {
    onApiError: (detail?: onApiErrorData | undefined) => void;
};
