import { useState } from "react";
import { useAction } from "./useAction";

export interface useModalProps {
    name?: string;
    active?: boolean;
    defaultActive?: boolean;
    onActive?: () => void;
    onClose?: () => void;
    onChange?: (d: boolean) => void;
}

export const useModal = ({
    name,
    active: activeProps,
    defaultActive: defaultActiveProps,
    onActive: onActiveProps,
    onChange: onChangeProps,
    onClose: onCloseProps,
}: useModalProps) => {
    const [active, setActive] = useState<boolean>(defaultActiveProps ?? false);

    const { onAction } = useAction<boolean>({
        name: name ?? "fenext-modal",
        onActionExecute: name
            ? (e) => {
                  setActive(e ?? false);
              }
            : undefined,
    });
    const onChange = (d: boolean) => {
        onChangeProps?.(d);
        setActive(d);
        onAction(d);
    };

    const onActive = () => {
        onChange(true);
        onActiveProps?.();
    };
    const onClose = () => {
        onChange(false);
        onCloseProps?.();
    };

    return {
        active: activeProps ?? active,
        onChange,
        onActive,
        onClose,
    };
};
