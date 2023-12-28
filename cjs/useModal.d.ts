/**
 * Props for configuring modal content.
 */
export interface useModalConfigContentProps {
    /**
     * A unique key to identify the content.
     */
    key: string;
    /**
     * Data to be passed to the modal content.
     */
    data: any;
}
/**
 * Options for configuring a modal dialog component.
 */
export interface useModalConfigProps {
    /**
     * Whether the modal dialog should be displayed.
     * Default is `false`.
     */
    active?: boolean;
    /**
     * Whether to use the modal dialog or not.
     * Default is `true`.
     */
    use?: boolean;
    /**
     * Whether to show a loader while the modal content is being loaded.
     * Default is `true`.
     */
    loader?: boolean;
    /**
     * The content to be displayed in the modal dialog.
     * Each item in the array should have a unique `key` and `data`.
     */
    content?: useModalConfigContentProps[];
}
/**
 * Represents a single content item to be displayed in a modal dialog.
 */
export interface useModalConfigContentProps {
    /**
     * Unique key for the content item.
     */
    key: string;
    /**
     * Data to be displayed in the content item.
     */
    data: any;
}
/**
 * Hook for managing modal state and configuration
 * @returns an object with modal state and functions to update it
 */
export declare const useModal: () => {
    valueModal: useModalConfigProps | undefined;
    loadModal: boolean;
    updateModal: (id: keyof useModalConfigProps, value: any) => void;
    setModal: (value: useModalConfigProps) => void;
};
