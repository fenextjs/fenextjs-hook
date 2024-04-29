import { useState } from "react";
import { useAction } from "./useAction";
import { useLocalStorage } from "uselocalstoragenextjs";

export interface useModalProps {
    name?: string;
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
    active: activeProps,
    defaultActive: defaultActiveProps,
    onActive: onActiveProps,
    onChange: onChangeProps,
    onClose: onCloseProps,
    disabled = false,
    activeByNameLocalStorage = false,
}: useModalProps) => {
    const [active, setActive] = useState<boolean>(defaultActiveProps ?? false);

    const { value: namesLocalStorage, setLocalStorage } = useLocalStorage<
        string[]
    >({
        name: "fenext-modal-active-name",
        parse: (e) => {
            try {
                return JSON.parse(e ?? "[]");
            } catch {
                return [];
            }
        },
        defaultValue: [],
    });

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

    return {
        active: activeByNameLocalStorage
            ? (namesLocalStorage ?? []).at(-1) == name
            : activeProps ?? active,
        onChange,
        onActive,
        onClose,
    };
};
