"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotification = void 0;
const react_1 = require("react");
const useAction_1 = require("../useAction");
/**
 * Hook to manage notification messages
 * @param time - Optional duration in milliseconds for the notification to be displayed
 * @returns An object with methods to manage notifications
 */
const useNotification = ({ time = 4000 }) => {
    const [notification, setNotification] = (0, react_1.useState)([]);
    const { onAction } = (0, useAction_1.useAction)({
        name: "fenextjs-notification",
        onActionExecute: (e) => {
            if (e) {
                setNotification((a) => [...a, ...e]);
                setTimeout(() => {
                    setNotification((a) => [...a].slice(e.length));
                }, time);
            }
        },
    });
    /**
     * Resets the notification to its default state
     */
    const reset = () => {
        onAction([]);
    };
    /**
     * Sets a notification to be displayed
     * @param props - Notification properties
     */
    const pop = (props, options) => {
        onAction([props]);
        window.Notification.requestPermission().then((permission) => {
            if (permission == "granted") {
                new window.Notification(props.message, options);
            }
        });
    };
    return {
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
//# sourceMappingURL=index.js.map