import { UserProps } from "fenextjs-interface/cjs/User";
/**
 * Properties to configure the useUser hook.
 */
export interface useUserProps<U = UserProps> {
    /**
     * Name Var of save user in localStorage.
     */
    varName?: string;
    onValidateUser?: (user: U | null | undefined) => boolean;
    urlRedirectInLogut?: string;
    onLogOut?: () => void;
}
/**
 * Hook to manage user data and authentication.
 * @param validateTokenUser Function to validate the user's token. By default, it will check that the user
 * object has a "token" property and decode it using JSON web tokens.
 * You can replace it with your own custom validation function.
 * @returns An object with the user data and authentication methods.
 */
export declare const useUser: <U = UserProps>({ varName, onValidateUser, urlRedirectInLogut, onLogOut: onLogOutProps, }: useUserProps<U>) => {
    load: boolean;
    user: U | null | undefined;
    setUser: (newValue: any) => void;
    onLogin: (data: U) => unknown;
    onLogOut: () => void;
    isValidUser: boolean;
};
