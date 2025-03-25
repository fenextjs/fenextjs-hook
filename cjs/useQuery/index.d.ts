/// <reference types="node" />
import { ParsedUrlQuery } from "querystring";
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
export declare const useQuery: <T = QueryDataDefault>(props?: useQueryProps<T>) => {
    load: any;
    query: T;
    setQuery: (query: T) => boolean;
    onConcatQuery: (newQuery: T) => boolean;
    onChangeQuery: (id: keyof T) => (value: T[keyof T]) => boolean;
    onDeleteQuery: (id: keyof T) => boolean;
    isChange: boolean;
};
