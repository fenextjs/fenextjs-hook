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
export declare const useQuery: (props?: useQueryProps) => {
    load: boolean;
    query: useQuery_QueryProps;
    setQuery: (query: useQuery_QueryProps) => boolean;
    onConcatQuery: (newQuery: useQuery_QueryProps) => boolean;
    onChangeQuery: (id: keyof useQuery_QueryProps) => (value: string | number | string[] | undefined) => boolean;
    isChange: boolean;
};
