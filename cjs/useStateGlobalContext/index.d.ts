import { SetStateAction } from "react";
export interface useStateGlobalContextProps<T> {
    defaultValue: T;
    name?: string;
}
export declare const useStateGlobalContext: <T>({ name, defaultValue, }: useStateGlobalContextProps<T>) => {
    data: T;
    setData: (f: SetStateAction<T>) => void;
};
