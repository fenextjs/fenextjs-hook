import { useMemo } from "react";

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

export const useJsonString = <T = any, P = string>({
    defaultValueJsonString,
    onChangeJsonString,
    parseJson_to_String,
    parseString_to_Json,
    valueJsonString,
    defaultValue,
    onChange,
    value,
}: useJsonStringProps<T, P>) => {
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
