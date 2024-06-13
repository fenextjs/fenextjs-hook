import { useCallback, useEffect, useState } from "react";
import {
    RequestProps,
    RequestResultDataProps,
    RequestResultTypeProps,
} from "fenextjs-interface/cjs/Request";
import { ErrorFenextjs } from "fenextjs-error";

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

    defaultResult?: RequestResultDataProps<R, E, T>;
    defaultResultValue?: R;
    defaultError?: E;
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
    defaultError = undefined,
    defaultResult = undefined,
    defaultResultValue = undefined,
}: useRequestProps<Q, R, E, T>) => {
    const [error, setError] = useState<E | undefined>(defaultError);
    const [result, setResult] = useState<
        RequestResultDataProps<R, E, T> | undefined
    >(defaultResult);
    const [resultValue, setResultValue] = useState<R | undefined>(
        defaultResultValue,
    );
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

export interface useRequestFunctionProps<FP, FR, PE = any> {
    f: RequestProps<FP, FR>;
    parseError?: (errors: any) => PE;

    defaultResult?: FR;
    defaultError?: PE;
}

export const useRequestFunction = <FP = any, FR = any, PE = any>({
    f,
    parseError = (e) => e,
    defaultError = undefined,
    defaultResult = undefined,
}: useRequestFunctionProps<FP, FR, PE>) => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<PE | undefined>(defaultError);
    const [result, setResult] = useState<FR | undefined>(defaultResult);

    interface onRequestActivionOptionsProps {
        onError?: (error: any) => void;
    }
    const onRequestAction = async (
        props: FP,
        options?: onRequestActivionOptionsProps,
    ) => {
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
        } catch (err: any) {
            const error = parseError?.(err) ?? err;
            setError(error);
            options?.onError?.(error);
            return error as PE;
        } finally {
            setLoader(false);
        }
    };
    const onRequest = async (props: FP) => {
        return await onRequestAction(props);
    };
    const onRequestWithThrow = async (props: FP) => {
        return await onRequestAction(props, {
            onError: (error) => {
                throw error;
            },
        });
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
        onRequestWithThrow,
        onClear,
    };
};

export interface useRequestLiteProps<FP, FR, FE = ErrorFenextjs> {
    f: (data: FP) => Promise<FR>;
    onResult?: (data: FR) => void;
    onError?: (data: FE) => void;
    parseError?: (errors: any) => FE;

    defaultResult?: FR;
    defaultError?: FE;
}

export const useRequestLite = <FP, FR, FE = ErrorFenextjs>({
    f,
    onError,
    onResult,
    parseError,

    defaultError = undefined,
    defaultResult = undefined,
}: useRequestLiteProps<FP, FR, FE>) => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<FE | undefined>(defaultError);
    const [result, setResult] = useState<FR | undefined>(defaultResult);

    const onRequest = async (props: FP) => {
        setLoader(true);
        setError(undefined);
        setResult(undefined);
        try {
            const r = await f(props);
            setResult(r as FR);
            onResult?.(r as FR);
            return r;
        } catch (err: any) {
            if(parseError){
                err = parseError(err)
            }
            setError(err as FE);
            onError?.(err as FE);
            return err as FE;
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
