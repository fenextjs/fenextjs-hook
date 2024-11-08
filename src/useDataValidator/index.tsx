import { ErrorFenextjs } from "fenextjs-error";
import { FenextjsValidatorClass } from "fenextjs-validator";
import { useEffect, useState } from "react";

export interface useDataValidatorProps<T> {
    data: T;
    validator?: FenextjsValidatorClass<T>;
    autoOnValidate?: boolean;
}

export const useDataValidator = <T,>({
    data,
    validator,
    autoOnValidate = true,
}: useDataValidatorProps<T>) => {
    const [isValidData, setIsValidData] = useState<
        true | ErrorFenextjs | undefined
    >(undefined);
    const onValidateData = () => {
        const v = validator?.onValidate?.(data) ?? true;
        setIsValidData(v);
    };
    useEffect(() => {
        if (autoOnValidate) {
            onValidateData();
        }
    }, [data, validator]);

    return {
        isValidData,
        onValidateData,
    };
};
