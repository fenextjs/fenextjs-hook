"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequestLite = exports.useRequestFunction = exports.useRequest = void 0;
const react_1 = require("react");
const Request_1 = require("fenextjs-interface/cjs/Request");
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
const useRequest = ({ query, request, autoRequest = false, }) => {
    const [error, setError] = (0, react_1.useState)(undefined);
    const [result, setResult] = (0, react_1.useState)(undefined);
    const [resultValue, setResultValue] = (0, react_1.useState)(undefined);
    const [loader, setLoader] = (0, react_1.useState)(false);
    const onRequest = (0, react_1.useCallback)(async () => {
        setLoader(true);
        try {
            setError(undefined);
            const respond = await request(query);
            setResultValue(respond.result);
            setResult(respond);
        }
        catch (error) {
            setError(error);
        }
        setLoader(false);
    }, [query]);
    (0, react_1.useEffect)(() => {
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
exports.useRequest = useRequest;
const useRequestFunction = ({ f, parseError = (e) => e, }) => {
    const [loader, setLoader] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [result, setResult] = (0, react_1.useState)(undefined);
    const onRequestAction = async (props, options) => {
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
        }
        catch (err) {
            const error = parseError?.(err) ?? err;
            setError(error);
            options?.onError?.(error);
            return {
                type: Request_1.RequestResultTypeProps.ERROR,
                error,
            };
        }
        finally {
            setLoader(false);
        }
    };
    const onRequest = async (props) => {
        return await onRequestAction(props);
    };
    const onRequestWithThrow = async (props) => {
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
exports.useRequestFunction = useRequestFunction;
const useRequestLite = ({ f, onError, onResult, }) => {
    const [loader, setLoader] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [result, setResult] = (0, react_1.useState)(undefined);
    const onRequest = async (props) => {
        setLoader(true);
        setError(undefined);
        setResult(undefined);
        try {
            const r = await f(props);
            setResult(r);
            onResult?.(r);
            return r;
        }
        catch (err) {
            setError(err);
            onError?.(err);
            return err;
        }
        finally {
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
exports.useRequestLite = useRequestLite;
//# sourceMappingURL=useRequest.js.map