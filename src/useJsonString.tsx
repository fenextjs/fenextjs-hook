import {  useMemo } from "react";

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

export const useJsonString = <T = any,>({
    defaultValueJsonString,
    onChangeJsonString,
    parseJson_to_String,
    parseString_to_Json,
    valueJsonString,
    defaultValue,
    onChange,
    value,
}: useJsonStringProps<T>) => {
    return useMemo(() => {
        return {
            value:
                (valueJsonString && parseString_to_Json
                    ? parseString_to_Json(valueJsonString)
                    : value) ?? value,
            defaultValue:
                (defaultValueJsonString && parseString_to_Json
                    ? parseString_to_Json(defaultValueJsonString)
                    : defaultValue) ?? defaultValue,
            onChange: (e: T) => {
                onChange?.(e);
                if (parseJson_to_String) {
                    onChangeJsonString?.(parseJson_to_String(e));
                }
            },
        };
    }, [
        defaultValueJsonString,
        onChangeJsonString,
        parseJson_to_String,
        parseString_to_Json,
        valueJsonString,
        defaultValue,
        onChange,
        value,
    ]);
};
