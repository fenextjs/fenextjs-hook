export default {
    id: "useApiQuery",
    name: "useApiQuery",
    description:
        "El hook useApiQuery permite realizar consultas a una API, gestionando la caché y los errores mediante React Query.",
    props: [
        {
            id: "url",
            type: "string",
            require: true,
            description: "URL de la API a consultar.",
        },
        {
            id: "options",
            type: "RequestInit",
            require: false,
            description: "Opciones adicionales para la solicitud fetch.",
        },
        {
            id: "input",
            type: "I",
            require: false,
            description: "Datos de entrada para la consulta, utilizados en la generación de query params.",
        },
        {
            id: "key",
            type: "string",
            require: true,
            description: "Clave única para la caché de React Query.",
        },
        {
            id: "useUserToken",
            type: "boolean",
            require: false,
            description: "Indica si se debe incluir el token de usuario en la consulta.",
            default: true,
        },
        {
            id: "usedataFilter",
            type: "boolean",
            require: false,
            description: "Indica si se deben aplicar filtros de datos.",
            default: true,
        },
        {
            id: "usepagination",
            type: "boolean",
            require: false,
            description: "Indica si se debe incluir la paginación en la consulta.",
            default: true,
        },
    ],
    returns: [
        {
            id: "queryResult",
            type: "IApiResult<R>",
            description: "Resultado de la consulta API, incluyendo datos o errores.",
        },
    ],
};
