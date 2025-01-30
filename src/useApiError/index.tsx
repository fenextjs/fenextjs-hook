import { useAction } from "../useAction";


export interface onApiErrorData {
    message: string;
}

export interface useApiErrorProps {
    onActionExecute?: (data?: onApiErrorData) => void;
}

export const useApiError = ({ onActionExecute }: useApiErrorProps) => {
    const { onAction: onApiError } = useAction<onApiErrorData>({
        name: "api-error",
        onActionExecute,
    });
    return { onApiError };
};
