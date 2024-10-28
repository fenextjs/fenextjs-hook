export default {
    id: "useAction",
    name: "useAction",
    description: "El hook useAction permite enviar información o ejecutar acciones entre componentes que no están directamente conectados pero existen en el DOM.",
    props: [
        {
            id: "name",
            type: "string",
            require: true,
            description: "Nombre único para diferenciar distintas acciones.",
        },
        {
            id: "onActionExecute",
            type: "(d?: T) => void",
            require: false,
            description: "Función que se ejecuta al recibir la acción.",
        },
        {
            id: "env_log",
            type: `{
                    onActionExecute?: boolean;
                    onAction?: boolean;
                }`,
            require: false,
            description: "Objeto que define qué eventos serán registrados en la consola.",
        }
    ],
    extras: [
        {
            id: "env_log",
            title: "env_log",
            description: "Dependiendo de los valores en 'true', se mostrarán los eventos en la consola:",
            tableItems: [
                {
                    Nombre: "onActionExecute",
                    Descripcion: "Muestra en consola al ejecutar onActionExecute.",
                    Default:false
                },
                {
                    Nombre: "onAction",
                    Descripcion: "Muestra en consola al ejecutar onAction.",
                    Default:false
                }
            ]
        }
    ],
    useExample: [
        {
            text: "Detectar acción",
            content: `useAction({ name: "name_action", onActionExecute: console.log })`
        },
        {
            text: "Ejecutar acción",
            content: `const { onAction } = useAction({ name: "name_action" });
                onAction()
            `
        },
        {
            text: "Definiendo interfaz",
            content: `const { onAction } = useAction<string>({ name: "name_action" });
                onAction("Data")
            `
        }
    ]
};
