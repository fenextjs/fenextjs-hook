"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = void 0;
const useLocalStorage_1 = require("../useLocalStorage");
const react_1 = require("react");
/**
 * Hook to manage user data and authentication.
 * @param validateTokenUser Function to validate the user's token. By default, it will check that the user
 * object has a "token" property and decode it using JSON web tokens.
 * You can replace it with your own custom validation function.
 * @returns An object with the user data and authentication methods.
 */
const useUser = ({ varName = "fenextjs-user", onValidateUser, urlRedirectInLogut, onLogOut: onLogOutProps, }) => {
    const { value: user, load, setLocalStorage: setUser, } = (0, useLocalStorage_1.useLocalStorage)({
        name: varName,
        defaultValue: null,
        parse: (v) => {
            try {
                return JSON.parse(v);
            }
            catch (error) {
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
    const onLogin = (data) => {
        try {
            if (onValidateUser) {
                if (!onValidateUser(data)) {
                    throw new Error("Invalid User");
                }
            }
            setUser(data);
            return true;
        }
        catch (error) {
            return error;
        }
    };
    /**
     * Sets the user to null, effectively logging them out of the application.
     */
    const onLogOut = () => {
        setUser(null);
        onLogOutProps?.();
        if (urlRedirectInLogut && typeof window != "undefined") {
            window.location.href = urlRedirectInLogut;
        }
    };
    const isValidUser = (0, react_1.useMemo)(() => (load ? onValidateUser?.(user) : true) ?? true, [load, user]);
    return {
        load,
        user,
        setUser,
        onLogin,
        onLogOut,
        isValidUser,
    };
};
exports.useUser = useUser;
//# sourceMappingURL=index.js.map