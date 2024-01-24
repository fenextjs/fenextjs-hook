import { useState } from "react";

export interface useModalProps {
    active?: boolean;
    defaultActive?: boolean;
    onActive?: () => void;
    onClose?: () => void;
    onChange?: (d: boolean) => void;
}

export const useModal = ({
    active: activeProps,
    defaultActive: defaultActiveProps,
    onActive: onActiveProps,
    onChange: onChangeProps,
    onClose: onCloseProps,
}: useModalProps) => {
    const [active, setActive] = useState<boolean>(defaultActiveProps ?? false);

    const onChange = (d: boolean) => {
        onChangeProps?.(d);
        setActive(d);
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
