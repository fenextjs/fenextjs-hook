import { ErrorFenextjs } from "fenextjs-error";
import { useData, useDataOptions } from "./useData";
import {
    RequestProps,
    RequestResultProps,
} from "fenextjs-interface/cjs/Request";
import { FenextjsValidatorClass } from "fenextjs-validator";
import { useCallback, useEffect } from "react";

export interface useFormProps<T, M = any> extends useDataOptions<T, M> {
    onSubmit?: RequestProps<T, RequestResultProps>;
    defaultValue?: T;
    setData?: (data: T) => void;
    onChangeError?: (error: ErrorFenextjs | undefined) => void;
    onChangeDisabled?: (disabled: boolean) => void;
    onChangeLoader?: (loader: boolean) => void;
    validator?: FenextjsValidatorClass<T>;
}

export const useForm = <T, M = any>({
    defaultValue,
    onChangeDisabled,
    onChangeLoader,
    onSubmit,
    validator,
    onChangeError,

    ...Options
}: useFormProps<T, M>) => {
    const DATA = useData<T, M>(defaultValue as T, Options);

    const { data: loader, setData: setLoader } = useData<boolean>(false, {
        onChangeDataAfter: onChangeLoader,
    });
    const { data: disabled, setData: setDisabled } = useData<boolean>(true, {
        onChangeDataAfter: onChangeDisabled,
    });

    const { data: error, setData: setError } = useData<
        ErrorFenextjs | undefined
    >(undefined, {
        onChangeDataAfter: onChangeError,
    });

    const onSubmitData = useCallback(async () => {
        setLoader(true);
        try {
            return await onSubmit?.(DATA.data);
        } finally {
            setLoader(false);
        }
    }, [DATA.data, onSubmit]);

    const onValidate = useCallback(() => {
        if (validator) {
            const r = validator?.onValidate?.(DATA.data);
            setDisabled(r !== true);
            setError(r !== true ? r : undefined);
        }
    }, [DATA.data, validator]);

    useEffect(() => {
        onValidate();
    }, [DATA.data, validator]);

    return {
        ...DATA,
        error,
        disabled,
        loader,
        setDisabled,
        setLoader,
        setError,
        onSubmit: onSubmitData,
    };
};
