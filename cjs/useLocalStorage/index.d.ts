export interface useLocalStorageProps<T = any, O = any> {
    name: string;
    defaultValue?: T;
    parse?: (value: any) => T;
    updateValue?: (oldValue: O, newValue: T) => T;
}
export declare const useLocalStorage: <T = any, O = any>(props: useLocalStorageProps<T, O>) => {
    load: boolean;
    value: T | undefined;
    setLocalStorage: (newValue: any) => void;
    onClearLocalStorage: () => void;
};
