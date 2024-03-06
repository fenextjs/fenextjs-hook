import { useLocalStorage } from "uselocalstoragenextjs";
import { jwtDecode } from "jwt-decode";
import { UserProps } from "fenextjs-interface/cjs/User";
import { ErrorCode } from "fenextjs-interface/cjs/Error";
import {
    RequestResultTypeProps,
    RequestProps,
    RequestResultDataProps,
} from "fenextjs-interface/cjs/Request";
import { useMemo } from "react";
import { useRouter } from "next/router";

/**
 * Properties to configure the useUser hook.
 */
export interface useUserProps<
    Q = UserProps,
    R = any,
    E = any,
    T = RequestResultTypeProps,
> {
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
export const useUser = <U = UserProps,>({
    validateTokenUser = async (user: U) => {
        const { token } = user as any;
        if (!token) {
            throw {
                type: RequestResultTypeProps.ERROR,
                message: "User not Token",
                error: {
                    code: ErrorCode.USER_TOKEN_NOT_FOUND,
                    message: "User not Token",
                },
            } as RequestResultDataProps;
        }
        try {
            const user_token = jwtDecode(token as string);
            const { id } = user_token as any;
            if (id) {
                return {
                    type: RequestResultTypeProps.OK,
                    message: "User Validate Ok",
                }
            }
            throw {
                type: RequestResultTypeProps.ERROR,
                message: "Token Invalid",
                error: {
                    code: ErrorCode.USER_TOKEN_INVALID,
                    message: "Token Invalid",
                },
            } as RequestResultDataProps;
        } catch (error) {
            throw {
                type: RequestResultTypeProps.ERROR,
                message: "Token Invalid",
                error: {
                    code: ErrorCode.USER_TOKEN_INVALID,
                    message: "Token Invalid",
                },
            } as RequestResultDataProps;
        }
    },
    varName = "fenextjs-user",
    onValidateUser,
    urlRedirectInLogut,
}: useUserProps<U>) => {
    const router = useRouter();
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
    const onLogin = async (data: U) => {
        try {
            const result = await validateTokenUser(data);
            if (result.type == RequestResultTypeProps.OK) {
                setUser(data);
            }
            return result;
        } catch (error) {
            return error;
        }
    };
    /**
     * Sets the user to null, effectively logging them out of the application.
     */
    const onLogOut = () => {
        setUser(null);
        if (urlRedirectInLogut) {
            router?.push?.(urlRedirectInLogut);
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
