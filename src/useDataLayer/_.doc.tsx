export default {
    id: "useDataLayer",
    name: "useDataLayer",
    description: "El hook useDataLayer permite interactuar con el objeto global de `dataLayer` para enviar eventos y datos personalizados.",
    props: [
        {
            id: "useDataLayerProps",
            type: "object",
            require: false,
            description: "Propiedades de configuración para el hook. Actualmente no requiere ninguna propiedad específica.",
        }
    ],
    returns: [
        {
            id: "push",
            type: "(props: useDataLayerPushProps) => boolean",
            description: "Función que envía un evento y datos al objeto `dataLayer`. Retorna `true` si el evento se ha enviado correctamente, `false` si `dataLayer` no está disponible.",
        }
    ],
    extras: [
        {
            id: "useDataLayerPushProps",
            title: "useDataLayerPushProps",
            description: "Propiedades que pueden ser enviadas a `dataLayer` usando la función `push`.",
            tableItems: [
                {
                    Nombre: "event",
                    Descripcion: "Nombre del evento que se va a enviar a `dataLayer`.",
                    Default: "N/A",
                },
                {
                    Nombre: "value",
                    Descripcion: "Valor opcional asociado al evento.",
                    Default: "undefined",
                },
                {
                    Nombre: "[id: string]: any",
                    Descripcion: "Propiedades adicionales que se pueden incluir en el evento.",
                    Default: "N/A",
                }
            ]
        }
    ],
    useExample: [
        {
            text: "Enviar evento básico",
            content: `const { push } = useDataLayer();
                push({ event: "pageView" });`
        },
        {
            text: "Enviar evento con datos adicionales",
            content: `const { push } = useDataLayer();
                push({ event: "userLogin", userId: "12345", value: "Inicio de sesión" });`
        }
    ]
};
