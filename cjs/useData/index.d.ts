/// <reference types="react" />
import { FenextjsValidatorClass } from "fenextjs-validator";
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
export interface useDataOptions<T, M = any, RT = void, RM = void, ET = any, EM = any> {
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
    onAfterSubmitDataOk?: (d: {
        data: T;
        result: RT;
    }) => void;
    onAfterSubmitParseError?: (error: any) => ET;
    onAfterSubmitDataError?: (d: {
        data: T;
        error: ET;
    }) => void;
    afterSubmitDataSetIsChangeFalse?: boolean;
    onSubmitDataMemo?: (data: M) => RM | Promise<RM>;
    onBeforeSubmitDataMemo?: (d: {
        dataMemo: M;
        isValidDataMemo?: ErrorFenextjs | true;
    }) => void;
    onAfterSubmitDataMemoOk?: (d: {
        dataMemo: M;
        result: RM;
    }) => void;
    onAfterSubmitParseErrorMemo?: (error: any) => EM;
    onAfterSubmitDataMemoError?: (d: {
        dataMemo: M;
        error: EM;
    }) => void;
    afterSubmitDataMemoSetIsChangeFalse?: boolean;
    autoOnValidate?: boolean;
    env_log?: {
        [id in useDataOptionsEnvLog]?: boolean;
    };
    useGlobalContext?: string;
}
export type useDataOptionsEnvLog = "data" | "dataMemo" | "isValidData" | "isValidDataMemo" | "dataError" | "dataErrorMemo" | "loaderSubmit" | "loaderSubmitMemo" | "keyData" | "isChange";
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
export declare const useData: <T, M = any, RT = void, RM = void, ET = any, EM = any>(defaultData: T, options?: useDataOptions<T, M, RT, RM, ET, EM>) => {
    data: T;
    onChangeData: (id: keyof T) => (value: T[keyof T], _options?: onChangeDataOptionsProps<T>) => void;
    onDeleteData: (id: keyof T) => void;
    isChange: boolean;
    setData: (nData: T, optionsData?: setDataOptions) => void;
    setDataFunction: (f: (p: T) => T, optionsData?: setDataOptions) => void;
    dataMemo: M;
    setIsChange: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    onRestart: () => void;
    onConcatData: (v: Partial<T> | Array<T>) => void;
    keyData: number;
    setKeyData: import("react").Dispatch<import("react").SetStateAction<number>>;
    onReloadKeyData: () => void;
    validator: FenextjsValidatorClass<T> | undefined;
    validatorData: { [id in keyof T]?: FenextjsValidatorClass<any> | undefined; } | undefined;
    validatorMemo: FenextjsValidatorClass<M> | undefined;
    validatorMemoData: { [id_1 in keyof M]?: FenextjsValidatorClass<any> | undefined; } | undefined;
    isValidData: true | ErrorFenextjs<any> | undefined;
    isValidDataMemo: true | ErrorFenextjs<any> | undefined;
    onValidateData: () => void;
    onValidateDataMemo: () => void;
    onSubmitData: (optionsSubmitData?: {
        data?: T;
        overwrite?: {
            onSubmitData?: useDataOptions<T, M, RT, RM, ET, EM>["onSubmitData"];
        };
        onSaveData?: (p: {
            data: T;
            result: RT;
        }) => T;
        useValidator?: boolean;
    }) => Promise<RT | undefined>;
    onSubmitDataMemo: (optionsSubmitDataMemo?: {
        dataMemo?: M;
        overwrite?: {
            onSubmitDataMemo?: useDataOptions<T, M, RT, RM, ET, EM>["onSubmitDataMemo"];
        };
        useValidatorMemo?: boolean;
    }) => Promise<RM | undefined>;
    loaderSubmit: boolean;
    loaderSubmitMemo: boolean;
    setLoaderSubmit: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setLoaderSubmitMemo: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    resultSubmitData: RT | undefined;
    resultSubmitDataMemo: RM | undefined;
    dataError: ET | undefined;
    dataErrorMemo: EM | undefined;
    setResultSubmitData: import("react").Dispatch<import("react").SetStateAction<RT | undefined>>;
    setResultSubmitDataMemo: import("react").Dispatch<import("react").SetStateAction<RM | undefined>>;
    setDataError: import("react").Dispatch<import("react").SetStateAction<ET | undefined>>;
    setDataErrorMemo: import("react").Dispatch<import("react").SetStateAction<EM | undefined>>;
};
