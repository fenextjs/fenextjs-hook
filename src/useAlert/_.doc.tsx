export default {
    id: "useAlert",
    name: "useAlert",
    description: "El hook useAlert permite gestionar y mostrar alertas en la aplicación, con opciones para establecer, limpiar y recibir actualizaciones de alertas.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            description: "Nombre único para diferenciar alertas. Por defecto, 'fenextjs-alert'.",
        }
    ],
    useExample: [
        {
            text: "Inicializar y escuchar alertas",
            content: `const { alert, setAlert, onClearAlert } = useAlert();`
        },
        {
            text: "Configurar una alerta",
            content: `setAlert({ message: "Esta es una alerta", type: "success" });`
        },
        {
            text: "Limpiar una alerta",
            content: `onClearAlert();`
        }
    ]
};
