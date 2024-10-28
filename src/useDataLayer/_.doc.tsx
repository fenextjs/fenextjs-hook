export default {
    id: "useDataLayer",
    name: "useDataLayer",
    description: "El hook useDataLayer permite interactuar con la capa de datos del navegador para enviar eventos y datos a herramientas de análisis.",
    props: [
        {
            id: "options",
            type: "useDataLayerProps",
            require: false,
            description: "Opciones adicionales para el hook.",
        },
    ],
    extras: [
        {
            id: "useDataLayerPushProps",
            title: "useDataLayerPushProps",
            description: "Opciones para el método push del hook:",
            tableItems: [
                {
                    Nombre: "event",
                    Descripcion: "Nombre del evento que se envía a la capa de datos.",
                    Default: "undefined",
                },
                {
                    Nombre: "value",
                    Descripcion: "Valor adicional que se envía junto con el evento.",
                    Default: "undefined",
                },
                {
                    Nombre: "[id: string]",
                    Descripcion: "Cualquier propiedad adicional que se quiera enviar.",
                    Default: "undefined",
                },
            ],
        },
    ],
    useExample: [
        {
            text: "Enviar un evento básico",
            content: `const { push } = useDataLayer();
push({ event: "pageView", value: { page: "home" } });`,
        },
        {
            text: "Enviar un evento con propiedades adicionales",
            content: `const { push } = useDataLayer();
push({ event: "buttonClick", value: { buttonId: "submit" }, additionalData: "test" });`,
        },
        {
            text: "Comprobar el envío exitoso",
            content: `const { push } = useDataLayer();
const success = push({ event: "formSubmit" });
if (success) {
    console.log("Evento enviado correctamente.");
}`,
        },
    ],
};
