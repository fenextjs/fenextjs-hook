"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiQuery = void 0;
const useFilter_1 = require("../useFilter");
const useUser_1 = require("../useUser");
const usePagination_1 = require("../usePagination");
const useApiError_1 = require("../useApiError");
const useRefresh_1 = require("../useRefresh");
const react_query_1 = require("@tanstack/react-query");
const fenextjs_functions_1 = require("fenextjs-functions");
const useApiQuery = ({ url, options, input, key, useUserToken = true, usedataFilter = true, usepagination = true, }) => {
    const { user, load } = (0, useUser_1.useUser)({});
    const { data: dataFilter } = (0, useFilter_1.useFilter)({});
    const { data: pagination } = (0, usePagination_1.usePagination)({});
    const { onApiError } = (0, useApiError_1.useApiError)({});
    const { data: { [key]: _key }, } = (0, useRefresh_1.useRefresh)({});
    const onQuery = async () => {
        const query = (0, fenextjs_functions_1.parseInputToQuery)({
            input: { ...dataFilter, ...input, ...pagination },
        });
        let FenextUser = undefined;
        if (user) {
            try {
                FenextUser = JSON.stringify(user);
            }
            catch {
                FenextUser = undefined;
            }
        }
        const response = await fetch(`${url}?${query}`, {
            method: "GET",
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `${user?.token}`,
                ...(FenextUser ? { FenextUser } : {}),
                ...options?.headers,
            },
        });
        const data = await response.json();
        if (data?.error) {
            onApiError(data);
            throw data;
        }
        return data;
    };
    const onQueryNotLoadUser = async () => {
        if (useUserToken == false) {
            return await onQuery();
        }
        await (0, fenextjs_functions_1.sleep)(1000);
        return {};
    };
    return (0, react_query_1.useQuery)({
        queryKey: [key],
        queryFn: load ? onQuery : onQueryNotLoadUser,
        queryHash: key +
            "-" +
            JSON.stringify({
                _key,
                input,
                user,
                load,
                ...(usedataFilter ? { dataFilter } : {}),
                ...(usepagination ? { pagination } : {}),
            }),
    });
};
exports.useApiQuery = useApiQuery;
//# sourceMappingURL=index.js.map