import { IApiError, IApiResult } from "../useApiQuery";
export interface useApiMutationCallbackProps<R> {
    onSuccess?: (data: IApiResult<R>) => void;
    onError?: (error: IApiError) => void;
}
export interface useApiMutationProps<I, R> extends useApiMutationCallbackProps<R> {
    url: string;
    options?: RequestInit;
    key: string;
    parseBody?: (data: I) => BodyInit | null;
}
export declare const useApiMutation: <I, R>({ url, onSuccess, onError, options, key, parseBody, }: useApiMutationProps<I, R>) => import("@tanstack/react-query").UseMutationResult<IApiResult<R>, IApiError, I, unknown>;
