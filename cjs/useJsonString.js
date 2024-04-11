"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJsonString = void 0;
const react_1 = require("react");
const useJsonString = ({ defaultValueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, valueJsonString, defaultValue, onChange, value, }) => {
    return (0, react_1.useMemo)(() => {
        return {
            value: (valueJsonString && parseString_to_Json
                ? parseString_to_Json(valueJsonString)
                : value) ?? value,
            defaultValue: (defaultValueJsonString && parseString_to_Json
                ? parseString_to_Json(defaultValueJsonString)
                : defaultValue) ?? defaultValue,
            onChange: (e) => {
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
exports.useJsonString = useJsonString;
//# sourceMappingURL=useJsonString.js.map