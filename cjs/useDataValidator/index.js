"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDataValidator = void 0;
const react_1 = require("react");
const useDataValidator = ({ data, validator, autoOnValidate = true, }) => {
    const [isValidData, setIsValidData] = (0, react_1.useState)(undefined);
    const onValidateData = () => {
        const v = validator?.onValidate?.(data) ?? true;
        setIsValidData(v);
    };
    (0, react_1.useEffect)(() => {
        if (autoOnValidate) {
            onValidateData();
        }
    }, [data, validator]);
    return {
        isValidData,
        onValidateData,
    };
};
exports.useDataValidator = useDataValidator;
//# sourceMappingURL=index.js.map