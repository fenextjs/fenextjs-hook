import { useEffect, useState } from "react";

import { PhoneProps, PhoneCodeProps } from "fenextjs-interface/cjs/Phone";
import { useData } from "./useData";

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
export const usePhone = ({
    defaultValue = {
        code: "",
        number: "",
    },
}: usePhoneProps) => {
    const [load, setLoad] = useState(false);
    const [codes, setCodes] = useState<PhoneCodeProps[]>([]);
    const { dataMemo: phone, onChangeData } = useData<PhoneProps, PhoneProps>(
        defaultValue,
        {
            onMemo: (data: PhoneProps) => {
                return {
                    ...data,
                    tel: `${data.code} ${data.number}`,
                };
            },
        },
    );

    /**
     * Loads the list of phone codes.
     */
    const loadPhones = async () => {
        const { phones } = await import("world-phones");
        setCodes(phones);
        setLoad(true);
        setCode(defaultValue.code);
    };
    useEffect(() => {
        loadPhones();
    }, []);

    /**
     * Sets the phone code.
     * @param code The phone code.
     */
    const setCode = (code: string) => {
        const codeSelect = codes.find((c) => c.code == code);
        onChangeData("code")(codeSelect?.code);
        onChangeData("img")(codeSelect?.img);
    };

    /**
     * Sets the phone number.
     * @param number The phone number.
     */
    const setNumber = (number: string) => {
        onChangeData("number")(number);
    };

    return {
        load,
        codes,
        phone,
        setCode,
        setNumber,
    };
};
