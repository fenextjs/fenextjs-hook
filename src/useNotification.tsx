import { useLocalStorage } from "uselocalstoragenextjs";
import { RequestResultTypeProps } from "fenextjs-interface/cjs/Request";

/**
 * Represents the properties of a notification
 */
export interface NotificationDataProps {
    /**
     * The type of the notification
     */
    type?: RequestResultTypeProps;
    /**
     * The message of the notification
     */
    message: string;
}

/**
 * Represents the properties of the useNotification hook
 */
export interface useNotificationProps {
    /**
     * The time to display the notification in milliseconds
     */
    time?: number;
}

/**
 * Hook to manage notification messages
 * @param time - Optional duration in milliseconds for the notification to be displayed
 * @returns An object with methods to manage notifications
 */
export const useNotification = ({ time = 2000 }: useNotificationProps) => {
    const {
        value: notification,
        load: loadNotification,
        setLocalStorage: setNotification,
    } = useLocalStorage<NotificationDataProps>({
        name: "fenextjs-notification",
        defaultValue: {
            type: RequestResultTypeProps.NORMAL,
            message: "",
        },
        parse: (v: any) => {
            try {
                return JSON.parse(v);
            } catch (error) {
                return {
                    type: RequestResultTypeProps.NONE,
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
            type: RequestResultTypeProps.NONE,
            message: "",
        });
    };

    /**
     * Sets a notification to be displayed
     * @param props - Notification properties
     */
    const pop = (props: NotificationDataProps) => {
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
