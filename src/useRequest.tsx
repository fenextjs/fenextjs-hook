import { useCallback, useEffect, useState } from "react";
import {
    RequestProps,
    RequestResultDataProps,
    RequestResultTypeProps,
} from "fenextjs-interface/cjs/Request";

/**
 * Properties for the `useRequest` hook.
 */
export interface useRequestProps<
    Q = any,
    R = any,
    E = any,
    T = RequestResultTypeProps,
> {
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
export const useRequest = <
    Q = any,
    R = any,
    E = any,
    T = RequestResultTypeProps,
>({
    query,
    request,
    autoRequest = false,
}: useRequestProps<Q, R, E, T>) => {
    const [error, setError] = useState<E | undefined>(undefined);
    const [result, setResult] = useState<
        RequestResultDataProps<R, E, T> | undefined
    >(undefined);
    const [resultValue, setResultValue] = useState<R | undefined>(undefined);
    const [loader, setLoader] = useState(false);

    const onRequest = useCallback(async () => {
        setLoader(true);
        try {
            setError(undefined);
            const respond = await request(query);
            setResultValue(respond.result);
            setResult(respond);
        } catch (error: any) {
            setError(error);
        }
        setLoader(false);
    }, [query]);

    useEffect(() => {
        if (autoRequest) {
            onRequest();
        }
    }, [query]);

    return {
        result,
        resultValue,
        loader,
        error,
        onRequest,
    };
};

export interface useRequestFunctionProps<FP, FR> {
    f: RequestProps<FP, FR>;
}

export const useRequestFunction = <FP = any, FR = any>({
    f,
}: useRequestFunctionProps<FP, FR>) => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(undefined);
    const [result, setResult] = useState<FR | undefined>(undefined);

    const onRequest = async (props: FP) => {
        setLoader(true);
        setError(undefined);
        setResult(undefined);
        try {
            const r = await f(props);
            if (r.error) {
                throw r.error;
            }
            setResult(r.result);
            return r;
        } catch (error: any) {
            setError(error);
            return error;
        } finally {
            setLoader(false);
        }
    };
    const onClear = () => {
        setLoader(false);
        setError(undefined);
        setResult(undefined);
    };
    return {
        loader,
        error,
        result,
        onRequest,
        onClear,
    };
};
