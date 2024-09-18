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
export declare const useModal: ({ name, nameLocalStorage, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, disabled, activeByNameLocalStorage, activeByNameContentLocalStorage, }: useModalProps) => {
    active: boolean;
    onChange: (d: boolean) => void;
    onActive: () => void;
    onClose: () => void;
};
