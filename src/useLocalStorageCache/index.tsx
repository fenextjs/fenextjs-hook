import { useCallback, useEffect } from "react";
import { useLocalStorage, useLocalStorageProps } from "uselocalstoragenextjs";

/**
 * Custom hook that extends useLocalStorageProps and adds caching functionality.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 */
export interface useLocalStorageCache<T = any, O = any>
    extends useLocalStorageProps<T, O> {
    data: T;

    autoSaveData?: boolean;
    parseDataPreSaveCache?: (data: { old?: T; news: T }) => T;
}

/**
 * Custom hook that provides caching functionality on top of useLocalStorage.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 * @param {useLocalStorageCache<T, O>} props - Configuration properties for the hook.
 * @returns {Object} - An object containing functions and values for managing cached data.
 */
export const useLocalStorageCache = <T = any, O = any>({
    data,
    autoSaveData = true,
    parseDataPreSaveCache = ({ news }) => news,
    ...props
}: useLocalStorageCache<T, O>) => {
    const { load, setLocalStorage, value, onClearLocalStorage } =
        useLocalStorage<T, O>(props);

    /**
     * Function to save the data to local storage with caching.
     * @param {T} news - New data to be cached.
     */
    const onSaveCache = useCallback(
        (news: T) => {
            const d = parseDataPreSaveCache({ news, old: value });
            setLocalStorage(d);
        },
        [value, parseDataPreSaveCache],
    );

    const onClearCache = () => {
        onClearLocalStorage();
    };

    // Automatically save data to local storage when it changes
    useEffect(() => {
        if (autoSaveData) {
            onSaveCache(data);
        }
    }, [data]);

    return {
        load,
        value,
        onSaveCache,
        onClearCache,
        setLocalStorage,
    };
};
