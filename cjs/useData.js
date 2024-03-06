"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useData = void 0;
const react_1 = require("react");
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
                return nData;
            }
            const nData = { ...pre, [id]: value };
            options?.onChangeDataAfter?.(nData);
            _options?.onCallback?.(nData);
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
    /**
     * if is valida data with validator options
     *
     * @returns {true | ErrorFenextjs<any>} - A true if is valida data, else return ErrorFenextjs
     */
    const isValidData = (0, react_1.useMemo)(() => {
        return options?.validator?.onValidate?.(data) ?? true;
    }, [data, options?.validator]);
    /**
     * if is valida data with validator options
     *
     * @returns {true | ErrorFenextjs<any>} - A true if is valida data, else return ErrorFenextjs
     */
    const isValidDataMemo = (0, react_1.useMemo)(() => {
        return options?.validatorMemo?.onValidate?.(dataMemo) ?? true;
    }, [dataMemo, options?.validatorMemo]);
    const onSubmitData = (0, react_1.useCallback)(async (optionsSubmitData) => {
        const dataUse = optionsSubmitData?.data ?? data;
        const isValidDataUse = optionsSubmitData?.data
            ? options?.validator?.onValidate?.(optionsSubmitData?.data) ??
                true
            : isValidData;
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
    const onSubmitDataMemo = (0, react_1.useCallback)(async () => {
        if (options?.onSubmitDataMemo && isValidDataMemo === true) {
            try {
                setDataErrorMemo(undefined);
                setResultSubmitDataMemo(undefined);
                setLoaderSubmitMemo(true);
                const result = await options?.onSubmitDataMemo?.(dataMemo);
                setResultSubmitDataMemo(result);
                options?.onAfterSubmitDataMemoOk?.({ dataMemo, result });
                if (options?.afterSubmitDataMemoSetIsChangeFalse) {
                    setIsChange(false);
                }
                return result;
            }
            catch (err) {
                const error = (options?.onAfterSubmitParseErrorMemo?.(err) ??
                    err);
                setDataErrorMemo(error);
                options?.onAfterSubmitDataMemoError?.({ dataMemo, error });
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
        resultSubmitData,
        resultSubmitDataMemo,
        dataError,
        dataErrorMemo,
    };
};
exports.useData = useData;
//# sourceMappingURL=useData.js.map