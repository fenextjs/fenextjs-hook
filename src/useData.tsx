import { FenextjsValidatorClass } from "fenextjs-validator";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface useDataOptionsRefreshDataIfChangeDefaultDataOptions {
    active?: boolean;
    useReloadKeyData?: boolean;
}

export interface setDataOptions {
    useOptionsOnChangeDataAfter?: boolean;
    useSetIsChange?: boolean;
}
/**
 * A custom hook options.
 *
 * @template T - The type of the data to manage.
 * @template M - The type of the memoized data.
 * @param {Object} options - The options for the hook.
 * @param {Function} options.onChangeDataAfter - A function to execute after the data changes.
 * @param {T} options.data - The data use not data.
 * @param {Boolean} options.refreshDataIfChangeDefaultData - A swich for change data if change defaultData.
 * @param {Function} options.onChangeDataMemoAfter - A function to execute after the dataMemo changes.
 * @param {Function} options.onMemo - A function to memoize the data.
 * @param {FenextjsValidatorClass} options.validator - A FenextjsValidatorClass for validate data.
 * @param {FenextjsValidatorClass} options.validatorMemo - A FenextjsValidatorClass for validate dataMemo.
 * @param {Function} options.onSubmitData - A function if is valid data for to send.
 * @param {Function} options.onSubmitDataMemo - A function if is valid dataMemo for to send.
 * @returns {Object} - An object with the data state and methods to manage it.
 */
export interface useDataOptions<T, M = any> {
    data?: T;
    refreshDataIfChangeDefaultData?: useDataOptionsRefreshDataIfChangeDefaultDataOptions;
    onChangeDataAfter?: (data: T) => void;
    onDeleteDataAfter?: (data: T) => void;
    onChangeDataMemoAfter?: (data: M) => void;
    onMemo?: (data: T) => M;
    validator?: FenextjsValidatorClass<T>;
    validatorMemo?: FenextjsValidatorClass<M>;
    onSubmitData?: (data: T) => void | Promise<void>;
    onSubmitDataMemo?: (data: T) => void | Promise<void>;
}

/**
 * A custom hook to manage data state and changes.
 *
 * @template T - The type of the data to manage.
 * @template M - The type of the memoized data.
 * @param {T} defaultData - The default value for the data.
 * @param {useDataOptions} options - The options for the hook.
 */
export const useData = <T, M = any>(
    defaultData: T,
    options?: useDataOptions<T, M>,
) => {
    type keys = keyof T;
    const [loaderSubmit, setLoaderSubmit] = useState(false);
    const [loaderSubmitMemo, setLoaderSubmitMemo] = useState(false);
    const [keyData, setKeyData] = useState<number>(0);
    const [isChange, setIsChange] = useState(false);
    const [data_, setDataD] = useState<T>(defaultData);
    const data = useMemo<T>(
        () => options?.data ?? data_,
        [data_, options?.data],
    );

    /**
     * Update a keyData
     *
     * @returns {Function} - A function to update the keyData.
     */
    const onReloadKeyData = () => {
        setKeyData(new Date().getTime());
    };

    /**
     * Update a single property of the data.
     *
     * @param {keys} id - The id of the property to update.
     * @returns {Function} - A function to update the property.
     */
    const onChangeData = (id: keyof T) => (value: (typeof data)[keys]) => {
        if (value === data[id]) {
            return;
        }
        setDataD((pre: T) => {
            if (Array.isArray(pre)) {
                const nData = [...pre] as T;
                nData[id] = value;
                options?.onChangeDataAfter?.(nData);
                return nData;
            }
            const nData = { ...pre, [id]: value };
            options?.onChangeDataAfter?.(nData);
            return nData;
        });
        setIsChange(true);
    };

    /**
     * Delete a single property of the data.
     *
     * @param {keys} id - The id of the property to delete.
     * @returns {Function} - A function to delete the property.
     */
    const onDeleteData = (id: keyof T) => {
        setDataD((pre: T) => {
            if (Array.isArray(pre)) {
                const nData = [...pre].filter(
                    (v, i) => i !== (id as number) && (v || !v),
                ) as T;
                options?.onChangeDataAfter?.(nData);
                options?.onDeleteDataAfter?.(nData);
                return nData;
            }
            const nData = { ...pre };
            delete nData[id];
            options?.onChangeDataAfter?.(nData);
            options?.onDeleteDataAfter?.(nData);
            return nData;
        });
        setIsChange(true);
    };

    /**
     * et the entire function.
     *
     * @param {Function} f  - The function for setData
     * @param {setDataOptions} optionsData - The new data.
     */
    const setDataFunction = (f: (p: T) => T, optionsData?: setDataOptions) => {
        setDataD((p) => {
            const n = f(p);
            if (!(optionsData?.useOptionsOnChangeDataAfter === false)) {
                options?.onChangeDataAfter?.(n);
            }
            return n;
        });
        if (!(optionsData?.useSetIsChange === false)) {
            setIsChange(true);
        }
    };

    /**
     * Set the entire data object.
     *
     * @param {T} nData - The new data.
     * @param {setDataOptions} optionsData - The new data.
     */
    const setData = (nData: T, optionsData?: setDataOptions) => {
        if (!(optionsData?.useOptionsOnChangeDataAfter === false)) {
            options?.onChangeDataAfter?.(nData);
        }
        setDataD(nData);
        if (!(optionsData?.useSetIsChange === false)) {
            setIsChange(true);
        }
    };
    /**
     * Concat add data.
     *
     * @param {T} v - The concat data.
     */
    const onConcatData = (v: Partial<T> | Array<T>) => {
        setDataD((pre: T) => {
            if (Array.isArray(pre)) {
                const nData = [...pre, ...(v as Array<T>)] as T;
                options?.onChangeDataAfter?.(nData);
                return nData;
            }
            if (typeof pre === "object") {
                const nData = {
                    ...pre,
                    ...v,
                };
                options?.onChangeDataAfter?.(nData);
                return nData;
            }
            if (typeof pre === "string" || typeof pre === "number") {
                const nData = `${pre}${v}` as T;
                options?.onChangeDataAfter?.(nData);
                return nData;
            }
            return pre;
        });
        setIsChange(true);
    };

    /**
     * Reset the data to the default value.
     */
    const onRestart = () => {
        setDataD(defaultData);
    };

    /**
     * Memoize the data.
     */
    const dataMemo: M = useMemo(() => {
        if (options?.onMemo) {
            return options?.onMemo?.(data);
        }
        return data as any;
    }, [data]);

    useEffect(() => {
        options?.onChangeDataMemoAfter?.(dataMemo);
    }, [dataMemo]);

    /**
     * if is valida data with validator options
     *
     * @returns {true | ErrorFenextjs<any>} - A true if is valida data, else return ErrorFenextjs
     */
    const isValidData = useMemo(() => {
        return options?.validator?.onValidate?.(data) ?? true;
    }, [data, options?.validator]);

    /**
     * if is valida data with validator options
     *
     * @returns {true | ErrorFenextjs<any>} - A true if is valida data, else return ErrorFenextjs
     */
    const isValidDataMemo = useMemo(() => {
        return options?.validatorMemo?.onValidate?.(dataMemo) ?? true;
    }, [dataMemo, options?.validatorMemo]);

    const onSubmitData = useCallback(async () => {
        if (options?.onSubmitData && isValidData === true) {
            try {
                setLoaderSubmit(true);
                await options?.onSubmitData?.(data);
            } finally {
                setLoaderSubmit(false);
            }
        }
    }, [data, isValidData, options?.onSubmitData]);
    const onSubmitDataMemo = useCallback(async () => {
        if (options?.onSubmitDataMemo && isValidData === true) {
            try {
                setLoaderSubmitMemo(true);
                await options?.onSubmitDataMemo?.(data);
            } finally {
                setLoaderSubmitMemo(false);
            }
        }
    }, [data, isValidData, options?.onSubmitDataMemo]);

    useEffect(() => {
        if (options?.refreshDataIfChangeDefaultData?.active === true) {
            setData(defaultData, {
                useOptionsOnChangeDataAfter: false,
                useSetIsChange: false,
            });
            if (
                options?.refreshDataIfChangeDefaultData?.useReloadKeyData ===
                true
            ) {
                onReloadKeyData();
            }
        }
    }, [defaultData, options]);
    return {
        data,
        onChangeData,
        onDeleteData,
        isChange,
        setData,
        setDataFunction,
        dataMemo,
        setIsChange,
        onRestart,
        onConcatData,

        keyData,
        setKeyData,
        onReloadKeyData,

        isValidData,
        isValidDataMemo,

        onSubmitData,
        onSubmitDataMemo,

        loaderSubmit,
        loaderSubmitMemo,
    };
};
