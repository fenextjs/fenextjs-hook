"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorageCache = void 0;
const react_1 = require("react");
const uselocalstoragenextjs_1 = require("uselocalstoragenextjs");
/**
 * Custom hook that provides caching functionality on top of useLocalStorage.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 * @param {useLocalStorageCache<T, O>} props - Configuration properties for the hook.
 * @returns {Object} - An object containing functions and values for managing cached data.
 */
const useLocalStorageCache = ({ data, autoSaveData = true, parseDataPreSaveCache = ({ news }) => news, ...props }) => {
    const { load, setLocalStorage, value, onClearLocalStorage } = (0, uselocalstoragenextjs_1.useLocalStorage)(props);
    /**
     * Function to save the data to local storage with caching.
     * @param {T} news - New data to be cached.
     */
    const onSaveCache = (0, react_1.useCallback)((news) => {
        const d = parseDataPreSaveCache({ news, old: value });
        setLocalStorage(d);
    }, [value, parseDataPreSaveCache]);
    const onClearCache = () => {
        onClearLocalStorage();
    };
    // Automatically save data to local storage when it changes
    (0, react_1.useEffect)(() => {
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
exports.useLocalStorageCache = useLocalStorageCache;
//# sourceMappingURL=useLocalStorageCache.js.map