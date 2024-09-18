import { useEffect, useMemo, useState } from "react";
import { useAction } from "./useAction";
import { useLocalStorage } from "uselocalstoragenextjs";

export interface useModalProps {
    name?: string;
    nameLocalStorage?: string;
    activeByNameLocalStorage?: boolean;
    activeByNameContentLocalStorage?: boolean;
    active?: boolean;
    defaultActive?: boolean;
    onActive?: () => void;
    onClose?: () => void;
    onChange?: (d: boolean) => void;
    disabled?: boolean;
}

export const useModal = ({
    name,
    nameLocalStorage,
    active: activeProps,
    defaultActive: defaultActiveProps,
    onActive: onActiveProps,
    onChange: onChangeProps,
    onClose: onCloseProps,
    disabled = false,
    activeByNameLocalStorage = false,
    activeByNameContentLocalStorage = false,
}: useModalProps) => {
    const [active, setActive] = useState<boolean>(defaultActiveProps ?? false);

    const { value, setLocalStorage } = useLocalStorage<string[]>({
        name: nameLocalStorage ?? "fenext-modal-active-name",
        parse: (e) => {
            try {
                return JSON.parse(e ?? "[]");
            } catch {
                return [];
            }
        },
        defaultValue: [],
    });
    const onLoadWindows = () => {
        if (!(window && typeof window != "undefined")) {
            return;
        }
        window.addEventListener("beforeunload", () => {
            setLocalStorage([]);
        });
    };
    useEffect(onLoadWindows, []);

    const namesLocalStorage = useMemo(
        () => (value ? [value].flat(2) : []),
        [value],
    );

    const onPush = (name?: string) => {
        if (
            name &&
            (activeByNameLocalStorage || activeByNameContentLocalStorage)
        ) {
            const n = [...(namesLocalStorage ?? []), name];
            setLocalStorage(n);
        }
    };
    const onPop = (name?: string) => {
        if (
            name &&
            (activeByNameLocalStorage || activeByNameContentLocalStorage)
        ) {
            const n = [...(namesLocalStorage ?? [])];
            if (n.at(-1) === name) {
                n.pop();
            }
            setLocalStorage(n);
        }
    };
    const { onAction } = useAction<boolean>({
        name: name ?? "fenext-modal",
        onActionExecute: name
            ? (e) => {
                  setActive(e ?? false);
              }
            : undefined,
    });
    const onChange = (d: boolean) => {
        if (disabled) {
            return;
        }
        if (d) {
            onPush(name);
        } else {
            onPop(name);
        }
        onChangeProps?.(d);
        setActive(d);
        onAction(d);
    };
    const onActive = () => {
        if (disabled) {
            return;
        }
        onChange(true);
        onActiveProps?.();
    };
    const onClose = () => {
        if (disabled) {
            return;
        }
        onChange(false);
        onCloseProps?.();
    };

    const { activeFinal, activeNameLast, activeName } = useMemo(() => {
        let ACTIVE: boolean | null = null;
        let ACTIVENAME: boolean | null = null;
        let ACTIVENAMELAST: boolean | null = null;
        if (activeByNameContentLocalStorage && name) {
            ACTIVE = namesLocalStorage.includes(name);
            ACTIVENAME = namesLocalStorage.includes(name);
        }
        if (activeByNameLocalStorage && name && namesLocalStorage.at(-1)) {
            ACTIVE = namesLocalStorage.at(-1) == name;
            ACTIVENAMELAST = namesLocalStorage.at(-1) == name;
        }
        return {
            activeFinal: ACTIVE ?? activeProps ?? active,
            activeName: ACTIVENAME,
            activeNameLast: ACTIVENAMELAST,
        };
    }, [
        activeByNameContentLocalStorage,
        activeByNameLocalStorage,
        namesLocalStorage,
        name,
        activeProps,
        active,
    ]);

    return {
        active: activeFinal,
        activeNameLast,
        activeName,
        onChange,
        onActive,
        onClose,
    };
};
