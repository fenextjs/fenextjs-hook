export interface useJsonStringProps<T = any, P = string> {
    /**
     * Default Value =
     */
    defaultValue?: T;
    /**
     * Value
     */
    value?: T;
    /**
     * onChange
     */
    onChange?: (data: T) => void;
    /**
     * Default Value
     */
    defaultValueJsonString?: P;
    /**
     * Value
     */
    valueJsonString?: P;
    /**
     * onChange
     */
    onChangeJsonString?: (data: P) => void;
    /**
     * parse
     */
    parseString_to_Json?: (data: P) => T;
    /**
     * parse
     */
    parseJson_to_String?: (data: T) => P;
}
export declare const useJsonString: <T = any, P = string>({ defaultValueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, valueJsonString, defaultValue, onChange, value, }: useJsonStringProps<T, P>) => {
    value: T | undefined;
    defaultValue: T | undefined;
    onChange: (e: T) => void;
};
