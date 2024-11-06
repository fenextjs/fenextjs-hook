"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useData = void 0;
const react_1 = require("react");
const useDataValidator_1 = require("../useDataValidator");
const fenextjs_functions_1 = require("fenextjs-functions");
/**
 * A custom hook to manage data state and changes.
 *
 * @template T - The type of the data to manage.
 * @template M - The type of the memoized data.
 * @param {T} defaultData - The default value for the data.
 * @param {useDataOptions} options - The options for the hook.
 */
const useData = (defaultData, options) => {
    const [loaderSubmit, setLoaderSubmit] = (0, react_1.useState)(false);
    const [loaderSubmitMemo, setLoaderSubmitMemo] = (0, react_1.useState)(false);
    const [keyData, setKeyData] = (0, react_1.useState)(0);
    const [isChange, setIsChange] = (0, react_1.useState)(false);
    const [data_, setDataD] = (0, react_1.useState)(defaultData);
    const [dataError, setDataError] = (0, react_1.useState)(undefined);
    const [dataErrorMemo, setDataErrorMemo] = (0, react_1.useState)(undefined);
    const [resultSubmitData, setResultSubmitData] = (0, react_1.useState)(undefined);
    const [resultSubmitDataMemo, setResultSubmitDataMemo] = (0, react_1.useState)(undefined);
    const data = (0, react_1.useMemo)(() => options?.data ?? data_, [data_, options?.data]);
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
    const onChangeData = (id) => (value, _options) => {
        if (value === data[id]) {
            return;
        }
        setDataD((pre) => {
            if (Array.isArray(pre)) {
                const nData = [...pre];
                nData[id] = value;
                options?.onChangeDataAfter?.(nData);
                _options?.onCallback?.(nData);
                if (_options?.parseDataBeforeOnChangeData) {
                    return _options?.parseDataBeforeOnChangeData(id, nData);
                }
                return nData;
            }
            const nData = { ...pre, [id]: value };
            options?.onChangeDataAfter?.(nData);
            _options?.onCallback?.(nData);
            if (_options?.parseDataBeforeOnChangeData) {
                return _options?.parseDataBeforeOnChangeData(id, nData);
            }
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
    const onDeleteData = (id) => {
        setDataD((pre) => {
            if (Array.isArray(pre)) {
                const nData = [...pre].filter((v, i) => i !== id && (v || !v));
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
    const setDataFunction = (f, optionsData) => {
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
    const setData = (nData, optionsData) => {
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
    const onConcatData = (v) => {
        setDataD((pre) => {
            if (Array.isArray(pre)) {
                const nData = [...pre, ...v];
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
                const nData = `${pre}${v}`;
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
        setIsChange(false);
    };
    /**
     * Memoize the data.
     */
    const dataMemo = (0, react_1.useMemo)(() => {
        if (options?.onMemo) {
            return options?.onMemo?.(data);
        }
        return data;
    }, [data]);
    (0, react_1.useEffect)(() => {
        options?.onChangeDataMemoAfter?.(dataMemo);
    }, [dataMemo]);
    const { isValidData, onValidateData } = (0, useDataValidator_1.useDataValidator)({
        data,
        validator: options?.validator,
        autoOnValidate: options?.autoOnValidate ?? true,
    });
    const { isValidData: isValidDataMemo, onValidateData: onValidateDataMemo } = (0, useDataValidator_1.useDataValidator)({
        data: dataMemo,
        validator: options?.validatorMemo,
        autoOnValidate: options?.autoOnValidate ?? true,
    });
    const onSubmitData = (0, react_1.useCallback)(async (optionsSubmitData) => {
        const dataUse = optionsSubmitData?.data ?? data;
        const isValidDataUse = optionsSubmitData?.useValidator === false ||
            (optionsSubmitData?.data
                ? options?.validator?.onValidate?.(optionsSubmitData?.data) ?? true
                : isValidData);
        if (options?.onSubmitData && isValidDataUse === true) {
            try {
                setDataError(undefined);
                setResultSubmitData(undefined);
                setLoaderSubmit(true);
                const result = await options?.onSubmitData?.(dataUse);
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
                return result;
            }
            catch (err) {
                const error = (options?.onAfterSubmitParseError?.(err) ??
                    err);
                setDataError(error);
                options?.onAfterSubmitDataError?.({ data: dataUse, error });
            }
            finally {
                setLoaderSubmit(false);
            }
        }
        return undefined;
    }, [data, isValidData, options?.onSubmitData]);
    const onSubmitDataMemo = (0, react_1.useCallback)(async (optionsSubmitDataMemo) => {
        const dataUse = optionsSubmitDataMemo?.dataMemo ?? dataMemo;
        const isValidDataUse = optionsSubmitDataMemo?.useValidatorMemo === false ||
            (optionsSubmitDataMemo?.dataMemo
                ? options?.validatorMemo?.onValidate?.(optionsSubmitDataMemo?.dataMemo) ?? true
                : isValidDataMemo);
        if (options?.onSubmitDataMemo && isValidDataUse === true) {
            try {
                setDataErrorMemo(undefined);
                setResultSubmitDataMemo(undefined);
                setLoaderSubmitMemo(true);
                const result = await options?.onSubmitDataMemo?.(dataUse);
                setResultSubmitDataMemo(result);
                options?.onAfterSubmitDataMemoOk?.({
                    dataMemo: dataUse,
                    result,
                });
                if (options?.afterSubmitDataMemoSetIsChangeFalse) {
                    setIsChange(false);
                }
                return result;
            }
            catch (err) {
                const error = (options?.onAfterSubmitParseErrorMemo?.(err) ?? err);
                setDataErrorMemo(error);
                options?.onAfterSubmitDataMemoError?.({
                    dataMemo: dataUse,
                    error,
                });
            }
            finally {
                setLoaderSubmitMemo(false);
            }
        }
        return undefined;
    }, [dataMemo, isValidDataMemo, options?.onSubmitDataMemo]);
    (0, react_1.useEffect)(() => {
        if (options?.refreshDataIfChangeDefaultData?.active === true) {
            setData(defaultData, {
                useOptionsOnChangeDataAfter: false,
                useSetIsChange: false,
            });
            if (options?.refreshDataIfChangeDefaultData?.useReloadKeyData ===
                true) {
                onReloadKeyData();
            }
        }
    }, [defaultData, options]);
    const validatorData = (0, react_1.useMemo)(() => options?.validator?.getObjectValidator?.(), [options?.validator]);
    if (options?.env_log) {
        if (options?.env_log?.data == true) {
            (0, fenextjs_functions_1.env_log)(data, {
                name: "useData - data",
                color: "#22cc8c",
            });
        }
        if (options?.env_log?.dataMemo == true) {
            (0, fenextjs_functions_1.env_log)(dataMemo, {
                name: "useData - dataMemo",
                color: "#22cc8c",
            });
        }
        if (options?.env_log?.isValidData == true) {
            (0, fenextjs_functions_1.env_log)(isValidData, {
                name: "useData - isValidData",
                color: "#f96161",
            });
        }
        if (options?.env_log?.isValidDataMemo == true) {
            (0, fenextjs_functions_1.env_log)(isValidDataMemo, {
                name: "useData - isValidDataMemo",
                color: "#f96161",
            });
        }
        if (options?.env_log?.dataError == true) {
            (0, fenextjs_functions_1.env_log)(dataError, {
                name: "useData - dataError",
                color: "#e84275",
            });
        }
        if (options?.env_log?.dataErrorMemo == true) {
            (0, fenextjs_functions_1.env_log)(dataErrorMemo, {
                name: "useData - dataErrorMemo",
                color: "#e84275",
            });
        }
        if (options?.env_log?.loaderSubmit == true) {
            (0, fenextjs_functions_1.env_log)(loaderSubmit, {
                name: "useData - loaderSubmit",
                color: "#f96161",
            });
        }
        if (options?.env_log?.loaderSubmitMemo == true) {
            (0, fenextjs_functions_1.env_log)(loaderSubmitMemo, {
                name: "useData - loaderSubmitMemo",
                color: "#f96161",
            });
        }
        if (options?.env_log?.keyData == true) {
            (0, fenextjs_functions_1.env_log)(keyData, {
                name: "useData - keyData",
                color: "#8d63e9",
            });
        }
        if (options?.env_log?.isChange == true) {
            (0, fenextjs_functions_1.env_log)(isChange, {
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
exports.useData = useData;
//# sourceMappingURL=index.js.map