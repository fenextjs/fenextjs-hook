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

    const { value: nameLocalStorage, setLocalStorage } =
        useLocalStorage<string>({
            name: "fenext-modal-active-name",
            parse: (e) => e,
            defaultValue: "-1",
        });
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
        setLocalStorage(d ? name : "-1");
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
            ? nameLocalStorage == name
            : activeProps ?? active,
        onChange,
        onActive,
        onClose,
    };
};
