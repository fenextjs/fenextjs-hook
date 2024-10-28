import { useEffect } from "react";

export type TypeListenerKeyFunctions = keyof DocumentEventMap;

export type TypeListenerFunctions<K extends TypeListenerKeyFunctions> = (
    ev: DocumentEventMap[K],
) => any;

export type useDocumentEventProps<K extends TypeListenerKeyFunctions> = {
    [id in TypeListenerKeyFunctions]?: TypeListenerFunctions<K>;
};

export const useDocumentEvent = <
    K extends TypeListenerKeyFunctions = TypeListenerKeyFunctions,
>({
    ...props
}: useDocumentEventProps<K>) => {
    const onLoad = () => {
        Object.keys(props).forEach((key) => {
            const listener = key;
            const fun = props[key];
            if (listener && fun) {
                document.addEventListener(listener, fun);
            }
        });
    };
    const onUnload = () => {
        Object.keys(props).forEach((key) => {
            const listener = key;
            const fun = props[key];
            if (listener && fun) {
                document.removeEventListener(listener, fun);
            }
        });
    };

    const onReload = () => {
        onUnload();
        onLoad();
    };

    useEffect(() => {
        onLoad();
        return () => {
            onUnload();
        };
    }, [props]);
    return {
        onReload,
    };
};
