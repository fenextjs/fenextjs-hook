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
export declare const useModal: ({ name, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, disabled, activeByNameLocalStorage, }: useModalProps) => {
    active: boolean;
    onChange: (d: boolean) => void;
    onActive: () => void;
    onClose: () => void;
};
