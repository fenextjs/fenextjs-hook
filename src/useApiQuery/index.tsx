import { useFilter } from "../useFilter";
import { useUser } from "../useUser";
import { usePagination } from "../usePagination";
import { useApiError } from "../useApiError";
import { useRefresh } from "../useRefresh";
import { useQuery } from "@tanstack/react-query";
import { sleep ,parseInputToQuery} from "fenextjs-functions";
import { ErrorFenextjs } from "fenextjs-error";

export interface IApiResult<T> {
    message: string;
    data: T;
}

export interface IApiError {
    message: string;
    error: ErrorFenextjs;
}

export type IApiRespond<T> = IApiResult<T> | IApiError;

export interface useApiQueryProps<I> {
    url: string;
    options?: RequestInit;
    input?: I;
    key: string;
    useUserToken?: boolean;
    usedataFilter?: boolean;
    usepagination?: boolean;
}

export const useApiQuery = <I, R>({
    url,
    options,
    input,
    key,
    useUserToken = true,
    usedataFilter = true,
    usepagination = true,
}: useApiQueryProps<I>) => {
    const { user, load } = useUser({});
    const { data: dataFilter } = useFilter({});
    const { data: pagination } = usePagination({});
    const { onApiError } = useApiError({});
    const {
        data: { [key]: _key },
    } = useRefresh({});

    const onQuery = async (): Promise<IApiResult<R>> => {
        const query = parseInputToQuery({
            input: { ...dataFilter, ...input, ...pagination },
        });
        const response = await fetch(`${url}?${query}`, {
            method: "GET",
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `${user?.token}`,
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
        await sleep(1000);
        return {} as IApiResult<R>;
    };

    return useQuery<IApiResult<R>, IApiError>({
        queryKey: [key],
        queryFn: load ? onQuery : onQueryNotLoadUser,
        queryHash:
            key +
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
