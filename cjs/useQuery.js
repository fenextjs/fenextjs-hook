"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
const router_1 = require("next/router");
const react_1 = require("react");
/**
 * A hook that provides access to the query parameters in the URL.
 */
const useQuery = (props) => {
    const tomorrow = (0, react_1.useMemo)(() => {
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24);
        return tomorrow;
    }, []);
    /**
     * Whether the query has been changed.
     */
    const [isChange, setIsChange] = (0, react_1.useState)(false);
    /**
     * The router instance from Next.js.
     */
    const router = (0, router_1.useRouter)();
    /**
     * The query parameters in the URL.
     */
    const query = (0, react_1.useMemo)(() => {
        if (!(router?.isReady ?? false)) {
            return {};
        }
        const q = router?.query ?? {};
        const { id = undefined, search = "", searchAddress = "", tab = "all", page = "0", npage = "10", totalpage = "100", allitems = "1000", start = undefined, end = undefined, order = undefined, orderBy = undefined, } = q;
        const r = {
            ...q,
            id,
            search,
            searchAddress,
            tab,
            page: parseInt(page),
            npage: parseInt(npage),
            totalpage: parseInt(totalpage),
            allitems: parseInt(allitems),
            start: start ? parseInt(start) : 0,
            end: end ? parseInt(end) : tomorrow?.getTime(),
            order,
            orderBy,
            exportBy: [q?.export ?? []].flat(2),
        };
        (props?.ignoreQuerys ?? []).map((e) => {
            delete r[e];
        });
        return r;
    }, [router?.query, router?.isReady, props]);
    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const setQuery = (0, react_1.useCallback)((query) => {
        if (!(router?.isReady ?? false)) {
            return false;
        }
        const queryParse = {};
        Object.keys(query).forEach((key) => {
            const v = `${query[key] ?? ""}`;
            if (v != "") {
                queryParse[key] = v;
            }
        });
        router?.push?.({
            pathname: router.pathname,
            query: queryParse,
        }, undefined, { scroll: false });
        setIsChange(true);
        return true;
    }, [router?.isReady, router?.query, router?.pathname]);
    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const onConcatQuery = (0, react_1.useCallback)((newQuery) => {
        const nQuery = {
            ...query,
            ...newQuery,
        };
        return setQuery(nQuery);
    }, [query]);
    /**
     * A function that returns an event handler that sets a query parameter.
     *
     * @param id - The key of the query parameter to set.
     */
    const onChangeQuery = (0, react_1.useCallback)((id) => (value) => {
        if (!(router?.isReady ?? false)) {
            return false;
        }
        router?.push?.({
            pathname: router.pathname,
            query: {
                ...(router?.query ?? {}),
                [id]: value,
            },
        }, undefined, { scroll: false });
        setIsChange(true);
        return true;
    }, [router?.isReady, router?.query, router?.pathname]);
    const onDeleteQuery = (0, react_1.useCallback)((id) => {
        if (!(router?.isReady ?? false)) {
            return false;
        }
        const q = { ...(router?.query ?? {}) };
        delete q[id];
        router?.push?.({
            pathname: router.pathname,
            query: { ...q },
        }, undefined, { scroll: false });
        setIsChange(true);
        return true;
    }, [router?.isReady, router?.query, router?.pathname]);
    return {
        load: router?.isReady ?? false,
        query,
        setQuery,
        onConcatQuery,
        onChangeQuery,
        onDeleteQuery,
        isChange,
    };
};
exports.useQuery = useQuery;
//# sourceMappingURL=useQuery.js.map