import { RequestResultTypeProps } from "fenextjs-interface/cjs/Request";
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
export declare const useNotification: ({ time }: useNotificationProps) => {
    /**
     * The current notification object
     */
    notification: NotificationDataProps | undefined;
    /**
     * Sets a new notification to be displayed
     */
    pop: (props: NotificationDataProps, options?: NotificationOptions) => void;
    /**
     * Resets the current notification
     */
    reset: () => void;
};
