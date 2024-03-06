import { UserProps } from "fenextjs-interface/cjs/User";
import { RequestResultTypeProps, RequestProps } from "fenextjs-interface/cjs/Request";
/**
 * Properties to configure the useUser hook.
 */
export interface useUserProps<Q = UserProps, R = any, E = any, T = RequestResultTypeProps> {
    /**
     * Function to validate the user's token. By default, it will check that the user
     * object has a "token" property and decode it using JSON web tokens.
     * You can replace it with your own custom validation function.
     */
    validateTokenUser?: RequestProps<Q, R, E, T>;
    /**
     * Name Var of save user in localStorage.
     */
    varName?: string;
    onValidateUser?: (user: Q | null | undefined) => boolean;
    urlRedirectInLogut?: string;
}
/**
 * Hook to manage user data and authentication.
 * @param validateTokenUser Function to validate the user's token. By default, it will check that the user
 * object has a "token" property and decode it using JSON web tokens.
 * You can replace it with your own custom validation function.
 * @returns An object with the user data and authentication methods.
 */
export declare const useUser: <U = UserProps>({ validateTokenUser, varName, onValidateUser, urlRedirectInLogut, }: useUserProps<U>) => {
    load: boolean;
    user: U | null | undefined;
    setUser: (newValue: any) => void;
    onLogin: (data: U) => Promise<unknown>;
    onLogOut: () => void;
    isValidUser: boolean;
};
