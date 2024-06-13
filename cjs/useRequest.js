"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequestLite = exports.useRequestFunction = exports.useRequest = void 0;
const react_1 = require("react");
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
const useRequest = ({ query, request, autoRequest = false, defaultError = undefined, defaultResult = undefined, defaultResultValue = undefined, }) => {
    const [error, setError] = (0, react_1.useState)(defaultError);
    const [result, setResult] = (0, react_1.useState)(defaultResult);
    const [resultValue, setResultValue] = (0, react_1.useState)(defaultResultValue);
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
const useRequestFunction = ({ f, parseError = (e) => e, defaultError = undefined, defaultResult = undefined, }) => {
    const [loader, setLoader] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(defaultError);
    const [result, setResult] = (0, react_1.useState)(defaultResult);
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
            return error;
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
const useRequestLite = ({ f, onError, onResult, parseError, defaultError = undefined, defaultResult = undefined, }) => {
    const [loader, setLoader] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(defaultError);
    const [result, setResult] = (0, react_1.useState)(defaultResult);
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
        catch (error) {
            let err = error;
            if (parseError) {
                err = parseError(error);
            }
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