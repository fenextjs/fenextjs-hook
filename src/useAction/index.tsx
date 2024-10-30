import { env_log } from "fenextjs-functions";
import { useEffect } from "react";

export interface useActionProps<T = any> {
    name: string;
    onActionExecute?: (d?: T) => void;
    env_log?: {
        onActionExecute?: boolean;
        onAction?: boolean;
    };
}

export const useAction = <T = any,>({
    name,
    onActionExecute,
    env_log: env_log_boolean,
}: useActionProps<T>) => {
    const NAME_ACTION = `fenext-action-element-${name}`;
    // const actionRef = useRef(onActionExecute);

    const ACTION = (e: any) => {
        const data = (e as any)?.detail;
        if (env_log_boolean?.onActionExecute === true) {
            env_log(data, {
                name: `${NAME_ACTION}-onActionExecute`,
            });
        }
        onActionExecute?.(data);
    };

    const onUnload = () => {
        if (!(window && typeof window != "undefined")) {
            return;
        }
        window.removeEventListener(NAME_ACTION, ACTION);
    };

    const onLoad = () => {
        if (!(window && typeof window != "undefined")) {
            setTimeout(onLoad, 500);
            return;
        }
        if (onActionExecute) {
            window.addEventListener(NAME_ACTION, ACTION);
        }
        return onUnload;
    };

    useEffect(onLoad, [onActionExecute]);

    const onAction = (detail?: T) => {
        if (env_log_boolean?.onAction === true) {
            env_log(detail, {
                name: `${NAME_ACTION}-onAction`,
            });
        }
        window.dispatchEvent(
            new CustomEvent(NAME_ACTION, {
                bubbles: true,
                detail,
            }),
        );
    };

    return {
        onAction,
    };
};
