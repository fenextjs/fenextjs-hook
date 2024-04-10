/// <reference types="react" />
import { ErrorFenextjs } from "fenextjs-error";
import { useDataOptions } from "./useData";
import { RequestProps, RequestResultProps } from "fenextjs-interface/cjs/Request";
import { FenextjsValidatorClass } from "fenextjs-validator";
export interface useFormProps<T, M = any> extends useDataOptions<T, M> {
    onSubmit?: RequestProps<T, RequestResultProps>;
    defaultValue?: T;
    setData?: (data: T) => void;
    onChangeError?: (error: ErrorFenextjs | undefined) => void;
    onChangeDisabled?: (disabled: boolean) => void;
    onChangeLoader?: (loader: boolean) => void;
    validator?: FenextjsValidatorClass<T>;
}
export declare const useForm: <T, M = any>({ defaultValue, onChangeDisabled, onChangeLoader, onSubmit, validator, onChangeError, ...Options }: useFormProps<T, M>) => {
    error: ErrorFenextjs<any> | undefined;
    disabled: boolean;
    loader: boolean;
    setDisabled: (nData: boolean, optionsData?: import("./useData").setDataOptions | undefined) => void;
    setLoader: (nData: boolean, optionsData?: import("./useData").setDataOptions | undefined) => void;
    setError: (nData: ErrorFenextjs<any> | undefined, optionsData?: import("./useData").setDataOptions | undefined) => void;
    onSubmit: () => Promise<import("fenextjs-interface/cjs/Request").RequestResultDataProps<RequestResultProps, any, import("fenextjs-interface/cjs/Request").RequestResultTypeProps> | undefined>;
    data: T;
    onChangeData: (id: keyof T) => (value: T[keyof T], _options?: import("./useData").onChangeDataOptionsProps<T> | undefined) => void;
    onDeleteData: (id: keyof T) => void;
    isChange: boolean;
    setData: (nData: T, optionsData?: import("./useData").setDataOptions | undefined) => void;
    setDataFunction: (f: (p: T) => T, optionsData?: import("./useData").setDataOptions | undefined) => void;
    dataMemo: M;
    setIsChange: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    onRestart: () => void;
    onConcatData: (v: Partial<T> | T[]) => void;
    keyData: number;
    setKeyData: import("react").Dispatch<import("react").SetStateAction<number>>;
    onReloadKeyData: () => void;
    validator: FenextjsValidatorClass<T> | undefined;
    validatorMemo: FenextjsValidatorClass<M> | undefined;
    isValidData: true | ErrorFenextjs<any> | undefined;
    isValidDataMemo: true | ErrorFenextjs<any> | undefined;
    onValidateData: () => void;
    onValidateDataMemo: () => void;
    onSubmitData: (optionsSubmitData?: {
        data?: T | undefined;
        onSaveData?: ((p: {
            data: T;
            result: void;
        }) => T) | undefined;
    } | undefined) => Promise<void | undefined>;
    onSubmitDataMemo: () => Promise<void | undefined>;
    loaderSubmit: boolean;
    loaderSubmitMemo: boolean;
    resultSubmitData: void | undefined;
    resultSubmitDataMemo: void | undefined;
    dataError: any;
    dataErrorMemo: any;
    setResultSubmitData: import("react").Dispatch<import("react").SetStateAction<void | undefined>>;
    setResultSubmitDataMemo: import("react").Dispatch<import("react").SetStateAction<void | undefined>>;
    setDataError: import("react").Dispatch<any>;
    setDataErrorMemo: import("react").Dispatch<any>;
};
