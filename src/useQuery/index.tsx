import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useMemo, useState } from "react";
/**
 * Query parameters for useQuery hook
 */

export interface QueryDataDefault {
    id?: string;
    search?: string;
    searchAddress?: string;
    tab?: string;
    page?: number;
    npage?: number;
    totalpage?: number;
    allitems?: number;
    start?: number;
    end?: number;
    order?: "asc" | "desc";
    orderBy?: string;
    exportBy?: string[];
}

export interface useQueryProps<T = QueryDataDefault> {
    ignoreQuerys?: [id: keyof T];
    parseQuery?: (data: ParsedUrlQuery) => T;
}

/**
 * A hook that provides access to the query parameters in the URL.
 */
export const useQuery = <T = QueryDataDefault,>(props?: useQueryProps<T>) => {
    const tomorrow = useMemo(() => {
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24);
        return tomorrow;
    }, []);

    /**
     * Whether the query has been changed.
     */
    const [isChange, setIsChange] = useState(false);
    /**
     * The router instance from Next.js.
     */
    const router = useRouter();
    /**
     * The query parameters in the URL.
     */
    const query: T = useMemo(() => {
        if (!(router?.isReady ?? false)) {
            return {} as T;
        }
        const q: any = router?.query ?? {};

        const parseQuery =
            props?.parseQuery ??
            ((q) => {
                const {
                    id = undefined,
                    search = "",
                    searchAddress = "",
                    tab = "all",
                    page = "0",
                    npage = "10",
                    totalpage = "100",
                    allitems = "1000",
                    start = undefined,
                    end = undefined,
                    order = undefined,
                    orderBy = undefined,
                } = q as any;

                const r: T = {
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
                } as T;
                return r;
            });

        const r = parseQuery(q);

        (props?.ignoreQuerys ?? []).map((e: keyof T) => {
            delete r[e];
        });
        return r;
    }, [
        router?.query,
        router?.isReady,
        props?.ignoreQuerys,
        props?.parseQuery,
    ]);

    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const setQuery = useCallback(
        (query: T) => {
            if (!(router?.isReady ?? false)) {
                return false;
            }
            const queryParse: {
                [id: string]: string;
            } = {};
            Object.keys(query as any).forEach((key) => {
                const v = `${(query as any)?.[key] ?? ""}`;
                if (v != "") {
                    queryParse[key] = v;
                }
            });
            router?.push?.(
                {
                    pathname: router.pathname,
                    query: queryParse,
                },
                undefined,
                { scroll: false },
            );
            setIsChange(true);
            return true;
        },
        [router?.isReady, router?.query, router?.pathname],
    );
    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const onConcatQuery = useCallback(
        (newQuery: T) => {
            const nQuery = {
                ...query,
                ...newQuery,
            };
            return setQuery(nQuery);
        },
        [query],
    );
    /**
     * A function that returns an event handler that sets a query parameter.
     *
     * @param id - The key of the query parameter to set.
     */
    const onChangeQuery = useCallback(
        (id: keyof T) => (value: (typeof query)[keyof T]) => {
            if (!(router?.isReady ?? false)) {
                return false;
            }
            router?.push?.(
                {
                    pathname: router.pathname,
                    query: {
                        ...(router?.query ?? {}),
                        [id]: value,
                    } as any,
                },
                undefined,
                { scroll: false },
            );
            setIsChange(true);
            return true;
        },
        [router?.isReady, router?.query, router?.pathname],
    );

    const onDeleteQuery = useCallback(
        (id: keyof T) => {
            if (!(router?.isReady ?? false)) {
                return false;
            }
            const q = { ...(router?.query ?? {}) } as any;
            delete q[id];
            router?.push?.(
                {
                    pathname: router.pathname,
                    query: { ...q },
                },
                undefined,
                { scroll: false },
            );
            setIsChange(true);
            return true;
        },
        [router?.isReady, router?.query, router?.pathname],
    );

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
