

export default {
    id: "useApiRequest",
    name: "useApiRequest",
    description:
        "El hook useApiRequest permite realizar peticiones POST a una API con manejo de caché y errores a través de React Query.",
    props: [
        {
            id: "url",
            type: "string",
            require: true,
            description: "URL de la API a la que se enviará la petición.",
        },
        {
            id: "options",
            type: "RequestInit",
            require: false,
            description: "Opciones adicionales para la solicitud fetch.",
        },
        {
            id: "key",
            type: "string",
            require: true,
            description: "Clave única para la caché de React Query.",
        },
        {
            id: "parseBody",
            type: "(data: I) => BodyInit | null",
            require: false,
            description: "Función para procesar los datos antes de enviarlos en la petición.",
            default: "JSON.stringify",
        },
        {
            id: "onSuccess",
            type: "(data: IApiResult<R>) => void",
            require: false,
            description: "Callback ejecutado si la petición es exitosa.",
        },
        {
            id: "onError",
            type: "(error: IApiError) => void",
            require: false,
            description: "Callback ejecutado si la petición falla.",
        },
    ],
    returns: [
        {
            id: "mutation",
            type: "Mutation<IApiResult<R>, IApiError, I>",
            description: "Mutación de React Query para manejar la petición API.",
        },
    ],
};
