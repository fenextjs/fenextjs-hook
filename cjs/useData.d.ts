/// <reference types="react" />
import { FenextjsValidatorClass } from "fenextjs-validator";
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
export interface useDataOptions<T, M = any, RT = void, RM = void> {
    data?: T;
    refreshDataIfChangeDefaultData?: useDataOptionsRefreshDataIfChangeDefaultDataOptions;
    onChangeDataAfter?: (data: T) => void;
    onDeleteDataAfter?: (data: T) => void;
    onChangeDataMemoAfter?: (data: M) => void;
    onMemo?: (data: T) => M;
    validator?: FenextjsValidatorClass<T>;
    validatorMemo?: FenextjsValidatorClass<M>;
    onSubmitData?: (data: T) => RT | Promise<RT>;
    onSubmitDataMemo?: (data: M) => RM | Promise<RM>;
}
/**
 * A custom hook to manage data state and changes.
 *
 * @template T - The type of the data to manage.
 * @template M - The type of the memoized data.
 * @param {T} defaultData - The default value for the data.
 * @param {useDataOptions} options - The options for the hook.
 */
export declare const useData: <T, M = any, RT = void, RM = void>(defaultData: T, options?: useDataOptions<T, M, RT, RM> | undefined) => {
    data: T;
    onChangeData: (id: keyof T) => (value: T[keyof T]) => void;
    onDeleteData: (id: keyof T) => void;
    isChange: boolean;
    setData: (nData: T, optionsData?: setDataOptions) => void;
    setDataFunction: (f: (p: T) => T, optionsData?: setDataOptions) => void;
    dataMemo: M;
    setIsChange: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    onRestart: () => void;
    onConcatData: (v: Partial<T> | T[]) => void;
    keyData: number;
    setKeyData: import("react").Dispatch<import("react").SetStateAction<number>>;
    onReloadKeyData: () => void;
    isValidData: true | import("fenextjs-error").ErrorFenextjs<any>;
    isValidDataMemo: true | import("fenextjs-error").ErrorFenextjs<any>;
    onSubmitData: () => Promise<RT | undefined>;
    onSubmitDataMemo: () => Promise<RM | undefined>;
    loaderSubmit: boolean;
    loaderSubmitMemo: boolean;
    resultSubmitData: RT | undefined;
    resultSubmitDataMemo: RM | undefined;
};
