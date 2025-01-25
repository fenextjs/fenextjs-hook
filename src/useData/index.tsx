import { FenextjsValidatorClass } from "fenextjs-validator";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDataValidator } from "../useDataValidator";
import { env_log, parseNumber } from "fenextjs-functions";
import { useAction } from "../useAction";
import { ErrorFenextjs } from "fenextjs-error";

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

export interface useDataOptions<
    T,
    M = any,
    RT = void,
    RM = void,
    ET = any,
    EM = any,
> {
    data?: T;
    refreshDataIfChangeDefaultData?: useDataOptionsRefreshDataIfChangeDefaultDataOptions;
    onChangeDataAfter?: (data: T) => void;
    onDeleteDataAfter?: (data: T) => void;
    onChangeDataMemoAfter?: (data: M) => void;
    memoDependencies?: any[];
    onMemo?: (data: T) => M;
    validator?: FenextjsValidatorClass<T>;
    validatorMemo?: FenextjsValidatorClass<M>;
    onSubmitData?: (data: T) => RT | Promise<RT>;
    onBeforeSubmitData?: (d: {
        data: T;
        isValid?: ErrorFenextjs | true;
    }) => void;
    onAfterSubmitDataOk?: (d: { data: T; result: RT }) => void;
    onAfterSubmitParseError?: (error: any) => ET;
    onAfterSubmitDataError?: (d: { data: T; error: ET }) => void;
    afterSubmitDataSetIsChangeFalse?: boolean;

    onSubmitDataMemo?: (data: M) => RM | Promise<RM>;
    onBeforeSubmitDataMemo?: (d: {
        dataMemo: M;
        isValidDataMemo?: ErrorFenextjs | true;
    }) => void;
    onAfterSubmitDataMemoOk?: (d: { dataMemo: M; result: RM }) => void;
    onAfterSubmitParseErrorMemo?: (error: any) => EM;
    onAfterSubmitDataMemoError?: (d: { dataMemo: M; error: EM }) => void;
    afterSubmitDataMemoSetIsChangeFalse?: boolean;
    autoOnValidate?: boolean;

    env_log?: {
        [id in useDataOptionsEnvLog]?: boolean;
    };

    useGlobalContext?: string;
}

export type useDataOptionsEnvLog =
    | "data"
    | "dataMemo"
    | "isValidData"
    | "isValidDataMemo"
    | "dataError"
    | "dataErrorMemo"
    | "loaderSubmit"
    | "loaderSubmitMemo"
    | "keyData"
    | "isChange";
export interface onChangeDataOptionsProps<T> {
    onCallback?: (data: T) => void;
    parseDataBeforeOnChangeData?: (id: keyof T, data: T) => T;
}

/**
 * A custom hook to manage data state and changes.
 *
 * @template T - The type of the data to manage.
 * @template M - The type of the memoized data.
 * @param {T} defaultData - The default value for the data.
 * @param {useDataOptions} options - The options for the hook.
 */
export const useData = <T, M = any, RT = void, RM = void, ET = any, EM = any>(
    defaultData: T,
    options?: useDataOptions<T, M, RT, RM, ET, EM>,
) => {
    type keys = keyof T;
    const [loaderSubmit, setLoaderSubmit] = useState(false);
    const [loaderSubmitMemo, setLoaderSubmitMemo] = useState(false);
    const [keyData, setKeyData] = useState<number>(0);
    const [isChange, setIsChange] = useState(false);
    const [data_, setDataD] = useState<T>(defaultData);
    const [dataError, setDataError] = useState<ET | undefined>(undefined);
    const [dataErrorMemo, setDataErrorMemo] = useState<EM | undefined>(
        undefined,
    );
    const [resultSubmitData, setResultSubmitData] = useState<RT | undefined>(
        undefined,
    );
    const [resultSubmitDataMemo, setResultSubmitDataMemo] = useState<
        RM | undefined
    >(undefined);
    const data = useMemo<T>(
        () => options?.data ?? data_,
        [data_, options?.data],
    );
    const NAME_DATA_ACTION = `fenextjs-data-action-${options?.useGlobalContext}`;
    const { onAction } = useAction<T>({
        name: NAME_DATA_ACTION,
        onActionExecute: options?.useGlobalContext
            ? (e) => {
                  const w = (window ?? {}) as any;

                  w[NAME_DATA_ACTION] = e;

                  setDataD(e as T);
              }
            : undefined,
    });
    const setDataAction = (d: T) => {
        if (options?.useGlobalContext) {
            onAction(d);
        }
    };
    const onLoadDataAction = () => {
        if (options?.useGlobalContext) {
            const w = (window ?? {}) as any;
            const e = w?.[NAME_DATA_ACTION];
            if (e != undefined) {
                setDataD(e as T);
            }
        }
    };
    useEffect(onLoadDataAction, []);

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
    const onChangeData =
        (id: keyof T) =>
        (
            value: (typeof data)[keys],
            _options?: onChangeDataOptionsProps<T>,
        ) => {
            if (value === data[id]) {
                return;
            }
            setDataD((pre: T) => {
                let nData: any;
                if (typeof pre === "string" || typeof pre === "number") {
                    nData = `${pre}` as T;
                    if (typeof id == "number" && id >= 0 && id < nData.length) {
                        nData =
                            nData.substring(0, id) +
                            value +
                            nData.substring(id + 1);
                    }
                    if (typeof pre === "number") {
                        nData = parseNumber(nData);
                    }
                } else if (Array.isArray(pre)) {
                    nData = [...pre] as T;
                    nData[id] = value;
                } else if (typeof pre == "object") {
                    nData = { ...pre, [id]: value };
                } else {
                    return pre;
                }
                options?.onChangeDataAfter?.(nData);
                _options?.onCallback?.(nData);
                if (_options?.parseDataBeforeOnChangeData) {
                    nData = _options?.parseDataBeforeOnChangeData(
                        id,
                        nData,
                    ) as any;
                }
                setDataAction(nData);
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
            let nData: any;
            if (typeof pre === "string" || typeof pre === "number") {
                nData = `${pre}` as T;
                if (typeof id == "number" && id >= 0 && id < nData.length) {
                    nData = nData.substring(0, id) + nData.substring(id + 1);
                }
                if (typeof pre === "number") {
                    nData = parseNumber(nData);
                }
            } else if (Array.isArray(pre)) {
                nData = [...pre].filter(
                    (v, i) => i !== (id as number) && (v || !v),
                ) as T;
            } else if (typeof pre == "object") {
                nData = { ...pre };
                delete nData[id];
            } else {
                return pre;
            }
            options?.onChangeDataAfter?.(nData);
            options?.onDeleteDataAfter?.(nData);
            setDataAction(nData);
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
            setDataAction(n);
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
        setDataAction(nData);
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
                setDataAction(nData);
                return nData;
            }
            if (typeof pre === "object") {
                const nData = {
                    ...pre,
                    ...v,
                };
                options?.onChangeDataAfter?.(nData);
                setDataAction(nData);
                return nData;
            }
            if (typeof pre === "string" || typeof pre === "number") {
                const nData = `${pre}${v}` as T;
                options?.onChangeDataAfter?.(nData);
                setDataAction(nData);
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
        setDataAction(defaultData);
        setIsChange(false);
    };

    /**
     * Memoize the data.
     */
    const dataMemo: M = useMemo(() => {
        if (options?.onMemo) {
            return options?.onMemo?.(data);
        }
        return data as any;
    }, [data, JSON.stringify({ a: options?.memoDependencies })]);

    useEffect(() => {
        options?.onChangeDataMemoAfter?.(dataMemo);
    }, [dataMemo]);

    const { isValidData, onValidateData } = useDataValidator<T>({
        data,
        validator: options?.validator,
        autoOnValidate: options?.autoOnValidate ?? true,
    });

    const { isValidData: isValidDataMemo, onValidateData: onValidateDataMemo } =
        useDataValidator<M>({
            data: dataMemo,
            validator: options?.validatorMemo,
            autoOnValidate: options?.autoOnValidate ?? true,
        });

    const onSubmitData = useCallback(
        async (optionsSubmitData?: {
            data?: T;
            overwrite?:{
                onSubmitData?:useDataOptions<T, M, RT, RM, ET, EM>['onSubmitData'] 
            }
            onSaveData?: (p: { data: T; result: RT }) => T;
            useValidator?: boolean;
        }) => {
            const dataUse = optionsSubmitData?.data ?? data;
            const isValidDataUse =
                optionsSubmitData?.useValidator === false ||
                (optionsSubmitData?.data
                    ? options?.validator?.onValidate?.(
                          optionsSubmitData?.data,
                      ) ?? true
                    : isValidData);
            options?.onBeforeSubmitData?.({
                data: dataUse,
                isValid: isValidDataUse,
            });
            const _onSubmitData = optionsSubmitData?.overwrite?.onSubmitData ?? options?.onSubmitData

            if (_onSubmitData && isValidDataUse === true) {
                try {
                    setDataError(undefined);
                    setResultSubmitData(undefined);
                    setLoaderSubmit(true);
                    const result = await _onSubmitData?.(dataUse);
                    setResultSubmitData(result);
                    options?.onAfterSubmitDataOk?.({ data: dataUse, result });
                    if (options?.afterSubmitDataSetIsChangeFalse) {
                        setIsChange(false);
                    }
                    if (optionsSubmitData?.onSaveData) {
                        const newData = optionsSubmitData?.onSaveData?.({
                            data: dataUse,
                            result,
                        });
                        setData(newData);
                    }
                    setLoaderSubmit(false);
                    return result;
                } catch (err) {
                    setLoaderSubmit(false);
                    const error = (options?.onAfterSubmitParseError?.(err) ??
                        (err as any)) as ET;
                    setDataError(error);
                    options?.onAfterSubmitDataError?.({ data: dataUse, error });
                } finally {
                    setLoaderSubmit(false);
                }
            }
            return undefined;
        },
        [data, isValidData, options?.onSubmitData],
    );
    const onSubmitDataMemo = useCallback(
        async (optionsSubmitDataMemo?: {
            dataMemo?: M;
            overwrite?:{
                onSubmitDataMemo?:useDataOptions<T, M, RT, RM, ET, EM>['onSubmitDataMemo'] 
            }
            useValidatorMemo?: boolean;
        }) => {
            const dataUse = optionsSubmitDataMemo?.dataMemo ?? dataMemo;
            const isValidDataUse =
                optionsSubmitDataMemo?.useValidatorMemo === false ||
                (optionsSubmitDataMemo?.dataMemo
                    ? options?.validatorMemo?.onValidate?.(
                          optionsSubmitDataMemo?.dataMemo,
                      ) ?? true
                    : isValidDataMemo);
            options?.onBeforeSubmitDataMemo?.({
                dataMemo: dataUse,
                isValidDataMemo: isValidDataUse,
            });
            const _onSubmitDataMemo = optionsSubmitDataMemo?.overwrite?.onSubmitDataMemo ?? options?.onSubmitDataMemo
            if (_onSubmitDataMemo && isValidDataUse === true) {
                try {
                    setDataErrorMemo(undefined);
                    setResultSubmitDataMemo(undefined);
                    setLoaderSubmitMemo(true);
                    const result = await _onSubmitDataMemo?.(dataUse);
                    setResultSubmitDataMemo(result);
                    options?.onAfterSubmitDataMemoOk?.({
                        dataMemo: dataUse,
                        result,
                    });
                    if (options?.afterSubmitDataMemoSetIsChangeFalse) {
                        setIsChange(false);
                    }
                    return result;
                } catch (err) {
                    const error = (options?.onAfterSubmitParseErrorMemo?.(
                        err,
                    ) ?? (err as any)) as EM;
                    setDataErrorMemo(error);
                    options?.onAfterSubmitDataMemoError?.({
                        dataMemo: dataUse,
                        error,
                    });
                } finally {
                    setLoaderSubmitMemo(false);
                }
            }
            return undefined;
        },
        [dataMemo, isValidDataMemo, options?.onSubmitDataMemo],
    );

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

    const validatorData = useMemo(
        () => options?.validator?.getObjectValidator?.(),
        [options?.validator],
    );

    const validatorMemoData = useMemo(
        () => options?.validatorMemo?.getObjectValidator?.(),
        [options?.validatorMemo],
    );

    if (options?.env_log) {
        if (options?.env_log?.data == true) {
            env_log(data, {
                name: "useData - data",
                color: "#22cc8c",
            });
        }
        if (options?.env_log?.dataMemo == true) {
            env_log(dataMemo, {
                name: "useData - dataMemo",
                color: "#22cc8c",
            });
        }
        if (options?.env_log?.isValidData == true) {
            env_log(isValidData, {
                name: "useData - isValidData",
                color: "#f96161",
            });
        }
        if (options?.env_log?.isValidDataMemo == true) {
            env_log(isValidDataMemo, {
                name: "useData - isValidDataMemo",
                color: "#f96161",
            });
        }
        if (options?.env_log?.dataError == true) {
            env_log(dataError, {
                name: "useData - dataError",
                color: "#e84275",
            });
        }
        if (options?.env_log?.dataErrorMemo == true) {
            env_log(dataErrorMemo, {
                name: "useData - dataErrorMemo",
                color: "#e84275",
            });
        }
        if (options?.env_log?.loaderSubmit == true) {
            env_log(loaderSubmit, {
                name: "useData - loaderSubmit",
                color: "#f96161",
            });
        }
        if (options?.env_log?.loaderSubmitMemo == true) {
            env_log(loaderSubmitMemo, {
                name: "useData - loaderSubmitMemo",
                color: "#f96161",
            });
        }
        if (options?.env_log?.keyData == true) {
            env_log(keyData, {
                name: "useData - keyData",
                color: "#8d63e9",
            });
        }
        if (options?.env_log?.isChange == true) {
            env_log(isChange, {
                name: "useData - isChange",
                color: "#8d63e9",
            });
        }
    }

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

        validator: options?.validator,
        validatorData,
        validatorMemo: options?.validatorMemo,
        validatorMemoData,

        isValidData,
        isValidDataMemo,

        onValidateData,
        onValidateDataMemo,

        onSubmitData,
        onSubmitDataMemo,

        loaderSubmit,
        loaderSubmitMemo,

        resultSubmitData,
        resultSubmitDataMemo,

        dataError,
        dataErrorMemo,

        setResultSubmitData,
        setResultSubmitDataMemo,

        setDataError,
        setDataErrorMemo,
    };
};
