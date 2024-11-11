export default {
    id: "useValidator",
    name: "useValidator",
    description: "Hook personalizado para gestionar la validación de datos con una instancia de validador.",
    props: [
        {
            id: "data",
            type: "T",
            require: true,
            description: "Los datos a validar.",
        },
        {
            id: "validator",
            type: "FenextjsValidatorClass<T>",
            require: false,
            description: "La instancia del validador utilizada para la validación.",
        }
    ],
    returns: [
        {
            id: "error",
            type: "ErrorFenextjs | undefined",
            description: "Error de validación si la validación falla, o `undefined` si es exitosa.",
        },
        {
            id: "isValid",
            type: "boolean",
            description: "Indica si la validación es exitosa.",
        },
        {
            id: "data",
            type: "T",
            description: "Los datos originales pasados al hook.",
        },
        {
            id: "validator",
            type: "FenextjsValidatorClass<T>",
            description: "Instancia del validador utilizada para la validación.",
        }
    ]
};
