import { useLocalStorageProps } from "uselocalstoragenextjs";
/**
 * Custom hook that extends useLocalStorageProps and adds caching functionality.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 */
export interface useLocalStorageCache<T = any, O = any> extends useLocalStorageProps<T, O> {
    data: T;
    autoSaveData?: boolean;
    parseDataPreSaveCache?: (data: {
        old?: T;
        news: T;
    }) => T;
}
/**
 * Custom hook that provides caching functionality on top of useLocalStorage.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 * @param {useLocalStorageCache<T, O>} props - Configuration properties for the hook.
 * @returns {Object} - An object containing functions and values for managing cached data.
 */
export declare const useLocalStorageCache: <T = any, O = any>({ data, autoSaveData, parseDataPreSaveCache, ...props }: useLocalStorageCache<T, O>) => {
    load: boolean;
    value: T | undefined;
    onSaveCache: (news: T) => void;
    onClearCache: () => void;
    setLocalStorage: (newValue: any) => void;
};
