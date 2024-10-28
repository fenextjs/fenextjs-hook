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
    const onLoad = () => {
        if (!(window && typeof window != "undefined")) {
            setTimeout(onLoad, 500);
            return;
        }
        if (onActionExecute) {
            window.addEventListener(
                `fenext-action-element-${name}`,
                (e) => {
                    const data = (e as any)?.detail;
                    if (env_log_boolean?.onActionExecute === true) {
                        env_log(data, {
                            name: `fenext-action-element-${name}-onActionExecute`,
                        });
                    }
                    onActionExecute?.(data);
                },
                false,
            );
        }
    };
    useEffect(onLoad, [onActionExecute]);

    const onAction = (detail?: T) => {
        if (env_log_boolean?.onAction === true) {
            env_log(detail, {
                name: `fenext-action-element-${name}-onAction`,
            });
        }
        window.dispatchEvent(
            new CustomEvent(`fenext-action-element-${name}`, {
                bubbles: true,
                detail,
            }),
        );
    };

    return {
        onAction,
    };
};
