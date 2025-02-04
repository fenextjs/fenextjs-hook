import { ErrorFenextjs } from "fenextjs-error";
export interface IApiResult<T> {
    message: string;
    data: T;
}
export interface IApiError {
    message: string;
    error: ErrorFenextjs;
}
export type IApiRespond<T> = IApiResult<T> | IApiError;
export interface useApiQueryProps<I> {
    url: string;
    options?: RequestInit;
    input?: I;
    key: string;
    useUserToken?: boolean;
    usedataFilter?: boolean;
    usepagination?: boolean;
}
export declare const useApiQuery: <I, R>({ url, options, input, key, useUserToken, usedataFilter, usepagination, }: useApiQueryProps<I>) => import("@tanstack/react-query").UseQueryResult<IApiResult<R>, IApiError>;
