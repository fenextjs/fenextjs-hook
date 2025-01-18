import { useLocalStorage } from "../useLocalStorage";
import { UserProps } from "fenextjs-interface/cjs/User";
import { useMemo } from "react";

/**
 * Properties to configure the useUser hook.
 */
export interface useUserProps<U = UserProps> {
    /**
     * Name Var of save user in localStorage.
     */
    varName?: string;

    onValidateUser?: (user: U | null | undefined) => boolean;

    urlRedirectInLogin?: string;

    urlRedirectInLogout?: string;

    onLogOut?: () => void;

    onLogin?: () => void;
}

/**
 * Hook to manage user data and authentication.
 * @param validateTokenUser Function to validate the user's token. By default, it will check that the user
 * object has a "token" property and decode it using JSON web tokens.
 * You can replace it with your own custom validation function.
 * @returns An object with the user data and authentication methods.
 */
export const useUser = <U = UserProps,>({
    varName = "fenextjs-user",
    onValidateUser,
    urlRedirectInLogin,
    urlRedirectInLogout,
    onLogOut: onLogOutProps,
    onLogin: onLoginProps,
}: useUserProps<U>) => {
    const {
        value: user,
        load,
        setLocalStorage: setUser,
    } = useLocalStorage<U | null>({
        name: varName,
        defaultValue: null,
        parse: (v: any) => {
            try {
                return JSON.parse(v);
            } catch (error) {
                return null;
            }
        },
    });

    /**
     * Function to log in a user. It will validate the user's token using the `validateTokenUser`
     * function, and if the token is valid, it will store the user data in local storage and return
     * a successful response. If the token is invalid, it will return an error response.
     * @param data The user data to log in.
     * @returns A `RequestResultDataProps` object with the response data. If the login is successful,
     * the object will have a `type` of "ok" and a `message` of "User Validate Ok". If the login fails,
     * the object will have a `type` of "error", a `message` of "Token Invalid", and an `error` property
     * with a `code` of `ErrorCode.USER_TOKEN_INVALID` and a `message` of "Token Invalid".
     */
    const onLogin = (data: U) => {
        try {
            if (onValidateUser) {
                if (!onValidateUser(data)) {
                    throw new Error("Invalid User");
                }
            }
            setUser(data);
            onLoginProps?.();
            if (urlRedirectInLogin && typeof window != "undefined") {
                window.location.href = urlRedirectInLogin;
            }
            return true;
        } catch (error) {
            return error;
        }
    };
    /**
     * Sets the user to null, effectively logging them out of the application.
     */
    const onLogOut = () => {
        setUser(null);
        onLogOutProps?.();
        if (urlRedirectInLogout && typeof window != "undefined") {
            window.location.href = urlRedirectInLogout;
        }
    };

    const isValidUser = useMemo(
        () => (load ? onValidateUser?.(user) : true) ?? true,
        [load, user],
    );

    return {
        load,
        user,
        setUser,
        onLogin,
        onLogOut,
        isValidUser,
    };
};
