export default {
    id: "useAlert",
    name: "useAlert",
    description: "El hook useAlert permite manejar alertas entre componentes, almacenando y ejecutando acciones de alerta de manera centralizada.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            description: "Nombre único que identifica la alerta para gestionar acciones específicas.",
            default: `"fenextjs-alert"`,
        }
    ],
    returns: [
        {
            id: "alert",
            type: "AlertProps<T> | undefined",
            description: "Objeto de alerta actual, que puede contener cualquier tipo de dato definido por AlertProps<T> o estar indefinido si no hay alerta activa.",
        },
        {
            id: "setAlert",
            type: "(detail?: AlertProps<T>) => void",
            description: "Función que ejecuta una nueva alerta, almacenando la información pasada como detalle.",
        },
        {
            id: "onClearAlert",
            type: "() => void",
            description: "Función para limpiar la alerta actual, estableciendo su valor como indefinido.",
        }
    ],
    useExample: [
        {
            text: "Detectar alerta",
            content: `const { alert, setAlert, onClearAlert } = useAlert();
                setAlert({ message: "Nueva alerta", type: "info" });
            `
        },
        {
            text: "Limpiar alerta",
            content: `const { onClearAlert } = useAlert();
                onClearAlert();
            `
        }
    ]
};
