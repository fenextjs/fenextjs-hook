export default {
    id: "useRequestLite",
    name: "useRequestLite",
    description:
        "Hook simplificado que permite ejecutar una función de solicitud con manejo de errores y estado de carga.",
    props: [
        {
            id: "f",
            type: "(data: FP) => Promise<FR>",
            require: true,
            description: "Función de solicitud a ejecutar.",
        },
        {
            id: "onResult",
            type: "(data: FR) => void",
            require: false,
            description: "Función de callback al recibir un resultado éxitoso.",
        },
        {
            id: "onError",
            type: "(data: FE) => void",
            require: false,
            description: "Función de callback al ocurrir un error.",
        },
        {
            id: "parseError",
            type: "(errors: any) => FE",
            require: false,
            description:
                "Función para analizar y transformar el error, si ocurre.",
        },
        {
            id: "defaultResult",
            type: "FR",
            require: false,
            description: "Resultado predeterminado de la solicitud.",
        },
        {
            id: "defaultError",
            type: "FE",
            require: false,
            description:
                "Error predeterminado en caso de fallo de la solicitud.",
        },
    ],
    returns: [
        {
            id: "loader",
            type: "boolean",
            description: "Indica si la solicitud está en curso.",
        },
        {
            id: "error",
            type: "FE | undefined",
            description: "Error de la solicitud, si ha ocurrido.",
        },
        {
            id: "result",
            type: "FR | undefined",
            description: "Resultado de la solicitud, si se ha completado.",
        },
        {
            id: "onRequest",
            type: "(props: FP) => Promise<void>",
            description: "Función para ejecutar la solicitud manualmente.",
        },
        {
            id: "onClear",
            type: "() => void",
            description:
                "Función para limpiar el estado del resultado y el error.",
        },
    ],
};
