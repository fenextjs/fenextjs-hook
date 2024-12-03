export default {
    id: "use_T",
    name: "use_T",
    description:
        "El hook use_T permite transformar textos en base a la configuración proporcionada.",
    props: [
        {
            id: "_t",
            type: "_TFunciton",
            require: false,
            description:
                "Función opcional para transformar el mensaje de entrada.",
        },
        {
            id: "useT",
            type: "boolean",
            require: false,
            description:
                "Indica si se debe aplicar la función `_t` en la validación del mensaje.",
            default: true,
        },
    ],
    returns: [
        {
            id: "_t",
            type: "(message: any) => any",
            description:
                "Función que transforma el mensaje de entrada basado en la configuración proporcionada.",
        },
    ],
    useExample: [
        {
            text: "Validar mensaje",
            content: `const { _t } = use_T({ _t: (msg) => msg.toUpperCase() });
_t("Mensaje a validar"); // Devuelve mensaje en mayúsculas`,
        },
        {
            text: "Desactivar transformación",
            content: `const { _t } = use_T({ _t: (msg) => msg.toUpperCase(), useT: false });
_t("Mensaje sin transformación"); // Devuelve mensaje sin aplicar _t`,
        },
    ],
};
