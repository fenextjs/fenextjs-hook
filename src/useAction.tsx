import { useCallback, useEffect, useMemo } from "react";

export interface useActionProps<T = any> {
    name: string;
    onActionExecute?: (d?: T) => void;
}

export const useAction = <T = any,>({
    name,
    onActionExecute,
}: useActionProps<T>) => {
    const uuid = useMemo(() => new Date().getTime() + "" + Math.random(), []);
    const id = useMemo(() => `fenext-action-element-${name}`, [name]);
    const onChange = useCallback(
        (actionElement: HTMLInputElement) => {
            if (!(window && typeof window != "undefined")) {
                return;
            }
            if (actionElement && onActionExecute) {
                let data: any = actionElement.getAttribute("data-action") ?? "";
                try {
                    data = JSON.parse(data);
                    data = data?.data;
                } catch {
                    data = {};
                }
                onActionExecute?.(data);
            }
        },
        [onActionExecute],
    );

    const onLoad = () => {
        if (!(window && typeof window != "undefined")) {
            setTimeout(onLoad, 500);
            return;
        }
        let actionElement: HTMLInputElement | null = document.getElementById(
            id,
        ) as HTMLInputElement;
        if (!actionElement) {
            actionElement = document.createElement("input");
            actionElement.id = id;
            actionElement.type = "checkbox";
            actionElement.setAttribute("style", "position: fixed;scale: 0;");
            document.body.append(actionElement);
        }
        actionElement = document.getElementById(id) as HTMLInputElement;
        if (onActionExecute) {
            (actionElement as any).onchangeuuid ??= {} as any;
            (actionElement as any).onchangeuuid[uuid] = (e: any) => {
                onChange(e.target as HTMLInputElement);
            };
            actionElement.onchange = (e) => {
                const ele = e.target as HTMLInputElement;
                Object.values((ele as any)?.onchangeuuid ?? {}).map(
                    (f: any) => {
                        f?.(e);
                    },
                );
                actionElement?.removeAttribute("data-action");
            };
        }
    };
    useEffect(onLoad, [name, onActionExecute, uuid]);

    const onAction = (data?: T) => {
        const actionElement: HTMLInputElement | null = document.getElementById(
            id,
        ) as HTMLInputElement;
        if (actionElement) {
            actionElement.setAttribute("data-action", JSON.stringify({ data }));
            actionElement.click();
        }
    };

    return {
        onAction,
    };
};
