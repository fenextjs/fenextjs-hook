/// <reference types="react" />
import { SearchDataProps, DateDataProps } from "fenextjs-interface";
export type useFilterDataProps<CF extends Record<string, any>> = SearchDataProps & Partial<CF> & {
    date?: DateDataProps;
};
export interface useFilterProps<CF extends Record<string, any>> {
    name?: string;
    onChage?: (data: useFilterDataProps<CF>) => void;
}
export declare const useFilter: <CF extends Record<string, any> = any>({ name, onChage, }: useFilterProps<CF>) => {
    data: useFilterDataProps<CF>;
    onChangeData: (id: "search" | "date" | keyof CF) => (value: useFilterDataProps<CF>["search" | "date" | keyof CF], _options?: import("../useData").onChangeDataOptionsProps<useFilterDataProps<CF>> | undefined) => void;
    onDeleteData: (id: "search" | "date" | keyof CF) => void;
    isChange: boolean;
    setData: (nData: useFilterDataProps<CF>, optionsData?: import("../useData").setDataOptions | undefined) => void;
    setDataFunction: (f: (p: useFilterDataProps<CF>) => useFilterDataProps<CF>, optionsData?: import("../useData").setDataOptions | undefined) => void;
    dataMemo: any;
    setIsChange: (f: import("react").SetStateAction<boolean>) => void;
    onRestart: () => void;
    onConcatData: (v: Partial<useFilterDataProps<CF>> | useFilterDataProps<CF>[]) => void;
    keyData: number;
    setKeyData: import("react").Dispatch<import("react").SetStateAction<number>>;
    onReloadKeyData: () => void;
    validator: import("fenextjs-validator").FenextjsValidatorClass<useFilterDataProps<CF>> | undefined;
    validatorData: (useFilterDataProps<CF> extends infer T ? { [id in keyof T]?: import("fenextjs-validator").FenextjsValidatorClass<any> | undefined; } : never) | undefined;
    validatorMemo: import("fenextjs-validator").FenextjsValidatorClass<any> | undefined;
    validatorMemoData: {
        [x: string]: import("fenextjs-validator").FenextjsValidatorClass<any> | undefined;
    } | undefined;
    isValidData: true | import("fenextjs-error").ErrorFenextjs<any> | undefined;
    isValidDataMemo: true | import("fenextjs-error").ErrorFenextjs<any> | undefined;
    onValidateData: () => void;
    onValidateDataMemo: () => void;
    onSubmitData: (optionsSubmitData?: {
        data?: useFilterDataProps<CF> | undefined;
        overwrite?: {
            onSubmitData?: ((data: useFilterDataProps<CF>) => void | Promise<void>) | undefined;
        } | undefined;
        onSaveData?: ((p: {
            data: useFilterDataProps<CF>;
            result: void;
        }) => useFilterDataProps<CF>) | undefined;
        useValidator?: boolean | undefined;
    } | undefined) => Promise<void | undefined>;
    onSubmitDataMemo: (optionsSubmitDataMemo?: {
        dataMemo?: any;
        overwrite?: {
            onSubmitDataMemo?: ((data: any) => void | Promise<void>) | undefined;
        } | undefined;
        useValidatorMemo?: boolean | undefined;
    } | undefined) => Promise<void | undefined>;
    loaderSubmit: boolean;
    loaderSubmitMemo: boolean;
    setLoaderSubmit: (f: import("react").SetStateAction<boolean>) => void;
    setLoaderSubmitMemo: (f: import("react").SetStateAction<boolean>) => void;
    resultSubmitData: void | undefined;
    resultSubmitDataMemo: void | undefined;
    dataError: any;
    dataErrorMemo: any;
    setResultSubmitData: (f: import("react").SetStateAction<void | undefined>) => void;
    setResultSubmitDataMemo: (f: import("react").SetStateAction<void | undefined>) => void;
    setDataError: (f: any) => void;
    setDataErrorMemo: (f: any) => void;
};
