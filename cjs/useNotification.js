"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotification = void 0;
const uselocalstoragenextjs_1 = require("uselocalstoragenextjs");
const Request_1 = require("fenextjs-interface/cjs/Request");
/**
 * Hook to manage notification messages
 * @param time - Optional duration in milliseconds for the notification to be displayed
 * @returns An object with methods to manage notifications
 */
const useNotification = ({ time = 2000 }) => {
    const { value: notification, load: loadNotification, setLocalStorage: setNotification, } = (0, uselocalstoragenextjs_1.useLocalStorage)({
        name: "fenextjs-notification",
        defaultValue: {
            type: Request_1.RequestResultTypeProps.NORMAL,
            message: "",
        },
        parse: (v) => {
            try {
                return JSON.parse(v);
            }
            catch (error) {
                return {
                    type: Request_1.RequestResultTypeProps.NONE,
                    message: "",
                };
            }
        },
    });
    /**
     * Resets the notification to its default state
     */
    const reset = () => {
        setNotification({
            type: Request_1.RequestResultTypeProps.NONE,
            message: "",
        });
    };
    /**
     * Sets a notification to be displayed
     * @param props - Notification properties
     */
    const pop = (props) => {
        setNotification(props);
        setTimeout(() => {
            reset();
        }, time);
    };
    return {
        /**
         * Loads the notification from local storage
         */
        loadNotification,
        /**
         * The current notification object
         */
        notification,
        /**
         * Sets a new notification to be displayed
         */
        pop,
        /**
         * Resets the current notification
         */
        reset,
    };
};
exports.useNotification = useNotification;
//# sourceMappingURL=useNotification.js.map