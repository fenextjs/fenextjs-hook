export interface useJsonStringProps<T = any> {
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
    defaultValueJsonString?: string;
    /**
     * Value
     */
    valueJsonString?: string;
    /**
     * onChange
     */
    onChangeJsonString?: (data: string) => void;
    /**
     * parse
     */
    parseString_to_Json?: (data: string) => T;
    /**
     * parse
     */
    parseJson_to_String?: (data: T) => string;
}
export declare const useJsonString: <T = any>({ defaultValueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, valueJsonString, defaultValue, onChange, value, }: useJsonStringProps<T>) => {
    value: T | undefined;
    defaultValue: T | undefined;
    onChange: (e: T) => void;
};
