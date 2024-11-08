import { ErrorFenextjs } from "fenextjs-error";
import { FenextjsValidatorClass } from "fenextjs-validator";
export interface useDataValidatorProps<T> {
    data: T;
    validator?: FenextjsValidatorClass<T>;
    autoOnValidate?: boolean;
}
export declare const useDataValidator: <T>({ data, validator, autoOnValidate, }: useDataValidatorProps<T>) => {
    isValidData: true | ErrorFenextjs<any> | undefined;
    onValidateData: () => void;
};
