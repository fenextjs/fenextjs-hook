export interface useActionDropDownProps {
    name?: string;
    onChange?: (e?: boolean) => void;
}
export declare const useActionDropDown: ({ name, onChange, }: useActionDropDownProps) => {
    onClose: () => void;
    onActive: () => void;
    onToogle: () => void;
};
