import { RequestProps, RequestResultDataProps, RequestResultTypeProps } from "fenextjs-interface/cjs/Request";
import { ErrorFenextjs } from "fenextjs-error";
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
export interface useRequestFunctionProps<FP, FR, PE = any> {
    f: RequestProps<FP, FR>;
    parseError?: (errors: any) => PE;
}
export declare const useRequestFunction: <FP = any, FR = any, PE = any>({ f, parseError, }: useRequestFunctionProps<FP, FR, PE>) => {
    loader: boolean;
    error: PE | undefined;
    result: FR | undefined;
    onRequest: (props: FP) => Promise<RequestResultDataProps<FR, any, RequestResultTypeProps> | {
        type: RequestResultTypeProps;
        error: any;
    }>;
    onRequestWithThrow: (props: FP) => Promise<RequestResultDataProps<FR, any, RequestResultTypeProps> | {
        type: RequestResultTypeProps;
        error: any;
    }>;
    onClear: () => void;
};
export interface useRequestLiteProps<FP, FR> {
    f: (data: FP) => Promise<FR>;
}
export declare const useRequestLite: <FP, FR, FE = ErrorFenextjs<any>>({ f, }: useRequestLiteProps<FP, FR>) => {
    loader: boolean;
    error: FE | undefined;
    result: FR | undefined;
    onRequest: (props: FP) => Promise<FR | FE>;
    onClear: () => void;
};
