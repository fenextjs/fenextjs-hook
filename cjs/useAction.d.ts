export interface useActionProps<T = any> {
    name: string;
    onActionExecute?: (d?: T) => void;
    env_log?: {
        onActionExecute?: boolean;
        onAction?: boolean;
    };
}
export declare const useAction: <T = any>({ name, onActionExecute, env_log: env_log_boolean, }: useActionProps<T>) => {
    onAction: (detail?: T) => void;
};
