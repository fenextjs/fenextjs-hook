"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiMutation = void 0;
const useRefresh_1 = require("../useRefresh");
const useUser_1 = require("../useUser");
const useApiError_1 = require("../useApiError");
const react_query_1 = require("@tanstack/react-query");
const fenextjs_error_1 = require("fenextjs-error");
const useApiMutation = ({ url, onSuccess, onError, options, key, parseBody = JSON.stringify, }) => {
    const { user } = (0, useUser_1.useUser)({});
    const { onApiError } = (0, useApiError_1.useApiError)({});
    const { onRefresh } = (0, useRefresh_1.useRefresh)({});
    const onMutation = async (input) => {
        const response = await fetch(url, {
            method: "POST",
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `${user?.token}`,
                ...options?.headers,
            },
            body: parseBody(input),
        });
        const data = await response.json();
        if (data?.error) {
            const err = {
                ...data,
                error: new fenextjs_error_1.ErrorFenextjs({
                    message: data?.error?.message ?? data?.error ?? "",
                }),
            };
            onApiError(err);
            throw err;
        }
        return data;
    };
    return (0, react_query_1.useMutation)({
        mutationFn: onMutation,
        onSuccess: (data) => {
            onRefresh([key]);
            onSuccess?.(data);
        },
        onError,
    });
};
exports.useApiMutation = useApiMutation;
//# sourceMappingURL=index.js.map