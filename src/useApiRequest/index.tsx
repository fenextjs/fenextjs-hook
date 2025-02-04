import {  useRefresh } from '../useRefresh';
import { useUser } from '../useUser';
import { IApiError, IApiResult } from '../useApiQuery';
import { useApiError } from '../useApiError';
import { useMutation } from '@tanstack/react-query';
import { ErrorFenextjs } from 'fenextjs-error';

export interface useApiRequestCallbackProps<R> {
    onSuccess?: (data: IApiResult<R>) => void;
    onError?: (error: IApiError) => void;
}
export interface useApiRequestProps<I,R> extends useApiRequestCallbackProps<R> {
    url: string;
    options?: RequestInit;
    key: string;
    parseBody?: (data:I)=>BodyInit | null
}

export const useApiRequest = <I, R>({
    url,
    onSuccess,
    onError,
    options,
    key,
    parseBody = JSON.stringify
}: useApiRequestProps<I,R>) => {
    const { user } = useUser({});
    const { onApiError } = useApiError({});
    const { onRefresh } = useRefresh({});

    const onRequest = async (input: I): Promise<IApiResult<R>> => {
        const response = await fetch(url, {
            method: 'POST',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user?.token}`,
                ...options?.headers,
            },
            body: parseBody(input),
        });
        const data = await response.json();
        if (data?.error) {
            const err = {
                ...data,
                error: new ErrorFenextjs({
                    message: data?.error?.message ?? data?.error ?? '',
                }),
            };
            onApiError(err);
            throw err;
        }
        return data;
    };

    return useMutation<IApiResult<R>, IApiError, I>({
        mutationFn: onRequest,
        onSuccess: (data) => {
            onRefresh([key]);
            onSuccess?.(data);
        },
        onError,
    });
};
