import { FenextjsValidatorClass } from "fenextjs-validator";
import { ErrorFenextjs } from "fenextjs-error";
/**
 * Interface to describe the properties of the useValidator hook.
 * @template T - The type of the data to manage.
 */
export interface useValidatorProps<T> {
    data: T;
    validator?: FenextjsValidatorClass<T>;
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
export declare const useValidator: <T>({ data, validator }: useValidatorProps<T>) => {
    error: ErrorFenextjs<any> | undefined;
    isValid: boolean;
    data: T;
    validator: FenextjsValidatorClass<T> | undefined;
};
