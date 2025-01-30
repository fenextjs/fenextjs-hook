import { useAction } from "../useAction";


export interface onApiErrorData {
    message: string;
}

export interface useApiErrorProps {
    onActionExecute?: (data?: onApiErrorData) => void;
}

export const useApiError = ({ onActionExecute }: useApiErrorProps) => {
    const { onAction: onApiErrorError } = useAction<onApiErrorData>({
        name: "api-error",
        onActionExecute,
    });
    return { onApiErrorError };
};
