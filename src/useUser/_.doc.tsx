export default {
    id: "useUser",
    name: "useUser",
    description: "Hook para gestionar datos de usuario y autenticación.",
    props: [
        {
            id: "validateTokenUser",
            type: "RequestProps<Q, R, E, T>",
            require: false,
            description: "Función para validar el token del usuario. Por defecto, verifica que el objeto del usuario tenga una propiedad 'token' y la decodifica utilizando JSON Web Tokens.",
        },
        {
            id: "varName",
            type: "string",
            require: false,
            description: "Nombre de la variable de almacenamiento en `localStorage` para guardar el usuario.",
        },
        {
            id: "onValidateUser",
            type: "(user: Q | null | undefined) => boolean",
            require: false,
            description: "Función personalizada para validar el objeto de usuario.",
        },
        {
            id: "urlRedirectInLogut",
            type: "string",
            require: false,
            description: "URL de redirección al cerrar sesión.",
        },
        {
            id: "onLogOut",
            type: "() => void",
            require: false,
            description: "Función que se ejecuta al cerrar sesión.",
        }
    ],
    returns: [
        {
            id: "load",
            type: "boolean",
            description: "Indica si el usuario se ha cargado desde `localStorage`.",
        },
        {
            id: "user",
            type: "U | null",
            description: "El usuario actual almacenado en `localStorage` o `null` si no hay usuario autenticado.",
        },
        {
            id: "setUser",
            type: "(user: U | null) => void",
            description: "Función para establecer los datos del usuario en `localStorage`.",
        },
        {
            id: "onLogin",
            type: "(data: U) => Promise<RequestResultDataProps>",
            description: "Función para iniciar sesión. Valida el token y guarda el usuario en `localStorage` si es válido.",
        },
        {
            id: "onLogOut",
            type: "() => void",
            description: "Función para cerrar sesión y redireccionar si se especifica una URL de redirección.",
        },
        {
            id: "isValidUser",
            type: "boolean",
            description: "Indica si el usuario actual es válido, basado en la función `onValidateUser`.",
        }
    ]
};
