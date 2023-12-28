import { FenextjsValidatorClass } from "fenextjs-validator";
import { ErrorFenextjs } from "fenextjs-error";
import { useMemo } from "react";

/**
 * Interface to describe the properties of the useValidator hook.
 * @template T - The type of the data to manage.
 */
export interface useValidatorProps<T> {
    data: T; // The data to validate.
    validator?: FenextjsValidatorClass<T>; // The validator instance to use for validation.
}

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
export const useValidator = <T,>({ data, validator }: useValidatorProps<T>) => {
    /**
     * The result of the validation.
     * @type {undefined | ErrorFenextjs}
     */
    const result: ErrorFenextjs | true | undefined = useMemo<
        ErrorFenextjs | true | undefined
    >(
        () => (validator ? validator.onValidate(data) : undefined),
        [data, validator],
    );

    /**
     * The error message if validation fails.
     * @type {undefined | ErrorFenextjs}
     */
    const error: undefined | ErrorFenextjs =
        result !== true ? result : undefined;

    /**
     * A boolean indicating if the validation is successful.
     * @type {boolean}
     */
    const isValid: boolean = result === true;

    // Return the validation results and the original data
    return {
        error,
        isValid,
        data,
        validator,
    };
};
