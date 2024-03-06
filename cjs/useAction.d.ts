export interface useActionProps<T = any> {
    name: string;
    onActionExecute?: (d?: T) => void;
}
export declare const useAction: <T = any>({ name, onActionExecute, }: useActionProps<T>) => {
    onAction: (data?: T) => void;
};
