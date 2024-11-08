"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const useData_1 = require("../useData");
const react_1 = require("react");
const useForm = ({ defaultValue, onChangeDisabled, onChangeLoader, onSubmit, validator, onChangeError, ...Options }) => {
    const DATA = (0, useData_1.useData)(defaultValue, Options);
    const { data: loader, setData: setLoader } = (0, useData_1.useData)(false, {
        onChangeDataAfter: onChangeLoader,
    });
    const { data: disabled, setData: setDisabled } = (0, useData_1.useData)(true, {
        onChangeDataAfter: onChangeDisabled,
    });
    const { data: error, setData: setError } = (0, useData_1.useData)(undefined, {
        onChangeDataAfter: onChangeError,
    });
    const onSubmitData = (0, react_1.useCallback)(async () => {
        setLoader(true);
        try {
            return await onSubmit?.(DATA.data);
        }
        finally {
            setLoader(false);
        }
    }, [DATA.data, onSubmit]);
    const onValidate = (0, react_1.useCallback)(() => {
        if (validator) {
            const r = validator?.onValidate?.(DATA.data);
            setDisabled(r !== true);
            setError(r !== true ? r : undefined);
        }
    }, [DATA.data, validator]);
    (0, react_1.useEffect)(() => {
        onValidate();
    }, [DATA.data, validator]);
    return {
        ...DATA,
        error,
        disabled,
        loader,
        setDisabled,
        setLoader,
        setError,
        onSubmit: onSubmitData,
    };
};
exports.useForm = useForm;
//# sourceMappingURL=index.js.map