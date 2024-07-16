import { useEffect, useMemo, useState } from "react";
import { useAction } from "./useAction";
import { useLocalStorage } from "uselocalstoragenextjs";

export interface useModalProps {
    name?: string;
    nameLocalStorage?: string;
    activeByNameLocalStorage?: boolean;
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
        if (name && activeByNameLocalStorage) {
            const n = [...(namesLocalStorage ?? []), name];
            setLocalStorage(n);
        }
    };
    const onPop = (name?: string) => {
        if (name && activeByNameLocalStorage) {
            const n = [...(namesLocalStorage ?? [])].filter((e) => e != name);
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

    const activeFinal = useMemo(() => {
        if (activeByNameLocalStorage && name && namesLocalStorage.at(-1)) {
            return namesLocalStorage.at(-1) == name;
        }
        return activeProps ?? active;
    }, [
        activeByNameLocalStorage,
        namesLocalStorage,
        name,
        activeProps,
        active,
    ]);

    return {
        active: activeFinal,
        onChange,
        onActive,
        onClose,
    };
};
