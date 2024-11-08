"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidator = void 0;
const react_1 = require("react");
/**
 * A custom hook to manage data state and changes.
 *
 * @template T - The type of the data to manage.
 * @param {useValidatorProps<T>} options - The options for the hook.
 * @param {T} options.data - The data to validate.
 * @param {FenextjsValidatorClass<T>} options.validator - The validator instance to use for validation.
 * @returns {Object} - An object with the validation results and original data.
 * @returns {Object.error} -  ErrorFenextjs | true
 * @returns {Object.isValid} - boolean
 * @returns {Object.data} -  T
 * @returns {Object.validator} -  FenextjsValidatorClass<T>
 */
const useValidator = ({ data, validator }) => {
    /**
     * The result of the validation.
     * @type {undefined | ErrorFenextjs}
     */
    const result = (0, react_1.useMemo)(() => (validator ? validator.onValidate(data) : undefined), [data, validator]);
    /**
     * The error message if validation fails.
     * @type {undefined | ErrorFenextjs}
     */
    const error = result !== true ? result : undefined;
    /**
     * A boolean indicating if the validation is successful.
     * @type {boolean}
     */
    const isValid = result === true;
    // Return the validation results and the original data
    return {
        error,
        isValid,
        data,
        validator,
    };
};
exports.useValidator = useValidator;
//# sourceMappingURL=index.js.map