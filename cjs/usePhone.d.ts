import { PhoneProps, PhoneCodeProps } from "fenextjs-interface/cjs/Phone";
/**
 * Interface for the usePhone hook configuration options.
 */
export interface usePhoneProps {
    defaultValue?: PhoneProps;
}
/**
 * Hook for managing phone numbers.
 * @param defaultValue The initial value of the phone number.
 * @returns An object with functions and data for managing phone numbers.
 */
export declare const usePhone: ({ defaultValue, }: usePhoneProps) => {
    load: boolean;
    codes: PhoneCodeProps[];
    phone: PhoneProps;
    setCode: (code: string) => void;
    setNumber: (number: string) => void;
};
