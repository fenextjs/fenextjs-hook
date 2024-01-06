import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
/**
 * Query parameters for useQuery hook
 */

export interface useQuery_QueryProps {
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
/**
 * Keys of useQuery_QueryProps
 */
export type useQuery_QueryKeysProps = keyof useQuery_QueryProps;

export interface useQueryProps {
    ignoreQuerys?: [id: useQuery_QueryKeysProps];
}

/**
 * A hook that provides access to the query parameters in the URL.
 */
export const useQuery = (props?: useQueryProps) => {
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
    const query: useQuery_QueryProps = useMemo(() => {
        if (!(router?.isReady ?? false)) {
            return {};
        }
        const q: any = router?.query ?? {};
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
        } = q;

        const r: useQuery_QueryProps = {
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
        (props?.ignoreQuerys ?? []).map((e: useQuery_QueryKeysProps) => {
            delete r[e];
        });
        return r;
    }, [router?.query, router?.isReady, props]);

    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const setQuery = (query: useQuery_QueryProps) => {
        if (!(router?.isReady ?? false)) {
            return false;
        }
        const queryParse: {
            [id: string]: string;
        } = {};
        Object.keys(query).forEach((key) => {
            const v = `${query[key] ?? ""}`;
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
    };
    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const onConcatQuery = useCallback(
        (newQuery: useQuery_QueryProps) => {
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
    const onChangeQuery =
        (id: keyof useQuery_QueryProps) =>
        (value: (typeof query)[useQuery_QueryKeysProps]) => {
            if (!(router?.isReady ?? false)) {
                return false;
            }
            router?.push?.(
                {
                    pathname: router.pathname,
                    query: {
                        ...(router?.query ?? {}),
                        [id]: value,
                    },
                },
                undefined,
                { scroll: false },
            );
            setIsChange(true);
            return true;
        };

    return {
        load: router?.isReady ?? false,
        query,
        setQuery,
        onConcatQuery,
        onChangeQuery,
        isChange,
    };
};
