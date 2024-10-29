export default {
    id: "useNotification",
    name: "useNotification",
    description:
        "El hook useNotification permite gestionar mensajes de notificación temporales en la aplicación, con control sobre su duración y estado.",
    props: [
        {
            id: "time",
            type: "number",
            require: false,
            description:
                "Tiempo en milisegundos durante el cual la notificación se muestra. Valor predeterminado: 2000.",
        },
    ],
    extras: [
        {
            id: "NotificationDataProps",
            title: "NotificationDataProps",
            description:
                "Propiedades de los datos de notificación, que incluyen el tipo y mensaje de la notificación.",
            tableItems: [
                {
                    Nombre: "type",
                    Descripcion:
                        "El tipo de la notificación. Puede ser un valor de RequestResultTypeProps o una clave de este tipo.",
                    Default: "undefined",
                },
                {
                    Nombre: "message",
                    Descripcion:
                        "Mensaje de texto que se muestra en la notificación.",
                    Default: "No aplica (obligatorio)",
                },
            ],
        },
    ],
    returns: [
        {
            id: "notification",
            type: "NotificationDataProps | undefined",
            description:
                "El objeto de notificación actual que contiene los datos de la notificación activa, si la hay.",
        },
        {
            id: "pop",
            type: "(props: NotificationDataProps, options?: NotificationOptions) => void",
            description:
                "Función que muestra una notificación con los datos especificados y la oculta después de que transcurre el tiempo especificado.",
        },
        {
            id: "reset",
            type: "() => void",
            description:
                "Función que reinicia la notificación al estado predeterminado.",
        },
    ],
    useExample: [
        {
            text: "Mostrar una notificación",
            content: `const { pop } = useNotification();
                pop({ message: "Notificación de éxito", type: "success" });`,
        },
        {
            text: "Reiniciar la notificación",
            content: `const { reset } = useNotification();
                reset();`,
        },
    ],
};
