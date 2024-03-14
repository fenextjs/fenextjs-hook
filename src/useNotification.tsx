import { RequestResultTypeProps } from "fenextjs-interface/cjs/Request";
import { useState } from "react";
import { useAction } from "./useAction";

/**
 * Represents the properties of a notification
 */
export interface NotificationDataProps {
    /**
     * The type of the notification
     */
    type?: RequestResultTypeProps | keyof typeof RequestResultTypeProps;
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
    const [notification, setNotification] = useState<
        NotificationDataProps | undefined
    >(undefined);
    const { onAction } = useAction<NotificationDataProps>({
        name: "fenextjs-notification",
        onActionExecute: setNotification,
    });

    /**
     * Resets the notification to its default state
     */
    const reset = () => {
        onAction(undefined);
    };

    /**
     * Sets a notification to be displayed
     * @param props - Notification properties
     */
    const pop = (
        props: NotificationDataProps,
        options?: NotificationOptions,
    ) => {
        onAction(props);
        Notification.requestPermission().then((permission) => {
            if (permission == "granted") {
                new Notification(props.message, options);
            }
        });
        setTimeout(() => {
            reset();
        }, time);
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
