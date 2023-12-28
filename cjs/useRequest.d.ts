import { RequestProps, RequestResultDataProps, RequestResultTypeProps } from "fenextjs-interface/cjs/Request";
/**
 * Properties for the `useRequest` hook.
 */
export interface useRequestProps<Q = any, R = any, E = any, T = RequestResultTypeProps> {
    query: Q;
    request: RequestProps<Q, R, E, T>;
    autoRequest?: boolean;
}
/**
 * A hook that sends an HTTP request.
 * @template Q Query parameter type.
 * @template R Response type.
 * @template E Error type.
 * @template T Request result type.
 * @param query Query parameter.
 * @param request HTTP request function.
 * @param autoRequest Whether to send the request automatically on mount.
 * @returns An object containing the request result, loading status, error, and request function.
 */
export declare const useRequest: <Q = any, R = any, E = any, T = RequestResultTypeProps>({ query, request, autoRequest, }: useRequestProps<Q, R, E, T>) => {
    result: RequestResultDataProps<R, E, T> | undefined;
    resultValue: R | undefined;
    loader: boolean;
    error: E | undefined;
    onRequest: () => Promise<void>;
};
export interface useRequestFunctionProps<FP, FR> {
    f: RequestProps<FP, FR>;
}
export declare const useRequestFunction: <FP = any, FR = any>({ f, }: useRequestFunctionProps<FP, FR>) => {
    loader: boolean;
    error: undefined;
    result: FR | undefined;
    onRequest: (props: FP) => Promise<any>;
    onClear: () => void;
};
