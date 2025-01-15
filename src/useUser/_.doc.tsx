export default {
    id: "useUser",
    name: "useUser",
    description: "Hook para gestionar datos de usuario y autenticación.",
    props: [
        {
            id: "varName",
            type: "string",
            require: false,
            description:
                "Nombre de la variable de almacenamiento en `localStorage` para guardar el usuario.",
        },
        {
            id: "onValidateUser",
            type: "(user: U | null | undefined) => boolean",
            require: false,
            description:
                "Función personalizada para validar el objeto de usuario.",
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
        },
    ],
    returns: [
        {
            id: "load",
            type: "boolean",
            description:
                "Indica si el usuario se ha cargado desde `localStorage`.",
        },
        {
            id: "user",
            type: "U | null",
            description:
                "El usuario actual almacenado en `localStorage` o `null` si no hay usuario autenticado.",
        },
        {
            id: "setUser",
            type: "(user: U | null) => void",
            description:
                "Función para establecer los datos del usuario en `localStorage`.",
        },
        {
            id: "onLogin",
            type: "(data: U) => true | Error",
            description:
                "Función para iniciar sesión. Valida el usuario con onValidateUser y guarda el usuario en `localStorage` si es válido.",
        },
        {
            id: "onLogOut",
            type: "() => void",
            description:
                "Función para cerrar sesión y redireccionar si se especifica una URL de redirección.",
        },
        {
            id: "isValidUser",
            type: "boolean",
            description:
                "Indica si el usuario actual es válido, basado en la función `onValidateUser`.",
        },
    ],
};
