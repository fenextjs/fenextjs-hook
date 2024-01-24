"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModalLocalStorage = void 0;
const tslib_1 = require("tslib");
const uselocalstoragenextjs_1 = tslib_1.__importDefault(require("uselocalstoragenextjs"));
/**
 * Hook for managing modal state and configuration
 * @returns an object with modal state and functions to update it
 */
const useModalLocalStorage = () => {
    /**
     * Custom hook for managing localStorage state
     */
    const { load: loadModal, setLocalStorage: setShowModal, value: valueModal, } = (0, uselocalstoragenextjs_1.default)({
        name: "fenextjs-modal",
        defaultValue: {
            active: false,
            use: false,
            loader: false,
            content: [],
        },
        parse: JSON.parse,
    });
    /**
     * Function to update a modal property
     * @param id - the name of the property to update
     * @param value - the new value for the property
     */
    const updateModal = (id, value) => {
        setShowModal({
            ...valueModal,
            [id]: value,
        });
    };
    /**
     * Function to set the entire modal configuration
     * @param value - the new modal configuration
     */
    const setModal = (value) => {
        setShowModal({
            ...valueModal,
            ...value,
        });
    };
    return {
        valueModal,
        loadModal,
        updateModal,
        setModal,
    };
};
exports.useModalLocalStorage = useModalLocalStorage;
//# sourceMappingURL=useModalLocalStorage.js.map