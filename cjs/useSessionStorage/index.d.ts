export interface useSessionStorageProps<T = any, O = any> {
    name: string;
    defaultValue?: T;
    parse?: (value: any) => T;
    updateValue?: (oldValue: O, newValue: T) => T;
}
export declare const useSessionStorage: <T = any, O = any>(props: useSessionStorageProps<T, O>) => {
    load: boolean;
    value: T | undefined;
    setSessionStorage: (newValue: any) => void;
    onClearSessionStorage: () => void;
};
