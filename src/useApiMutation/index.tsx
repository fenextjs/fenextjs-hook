import { useRefresh } from "../useRefresh";
import { useUser } from "../useUser";
import { IApiError, IApiResult } from "../useApiQuery";
import { useApiError } from "../useApiError";
import { useMutation } from "@tanstack/react-query";
import { ErrorFenextjs } from "fenextjs-error";

export interface useApiMutationCallbackProps<R> {
    onSuccess?: (data: IApiResult<R>) => void;
    onError?: (error: IApiError) => void;
}
export interface useApiMutationProps<I, R>
    extends useApiMutationCallbackProps<R> {
    url: string;
    options?: RequestInit;
    key: string;
    parseBody?: (data: I) => BodyInit | null;
}

export const useApiMutation = <I, R>({
    url,
    onSuccess,
    onError,
    options,
    key,
    parseBody = JSON.stringify,
}: useApiMutationProps<I, R>) => {
    const { user } = useUser({});
    const { onApiError } = useApiError({});
    const { onRefresh } = useRefresh({});

    const onMutation = async (input: I): Promise<IApiResult<R>> => {
        let FenextUser: string | undefined = undefined;
        if (user) {
            try {
                FenextUser = JSON.stringify(user);
            } catch {
                FenextUser = undefined;
            }
        }
        const response = await fetch(url, {
            method: "POST",
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `${user?.token}`,
                ...(FenextUser ? { FenextUser } : {}),
                ...options?.headers,
            },
            body: parseBody(input),
        });
        const data = await response.json();
        if (data?.error) {
            const err = {
                ...data,
                error: new ErrorFenextjs({
                    message: data?.error?.message ?? data?.error ?? "",
                }),
            };
            onApiError(err);
            throw err;
        }
        return data;
    };

    return useMutation<IApiResult<R>, IApiError, I>({
        mutationFn: onMutation,
        onSuccess: (data) => {
            onRefresh([key]);
            onSuccess?.(data);
        },
        onError,
    });
};
