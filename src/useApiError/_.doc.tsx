export default {
    id: "useApiError",
    name: "useApiError",
    description:
        "El hook useApiError permite manejar errores de la API utilizando el sistema de acciones de useAction.",
    props: [
        {
            id: "onActionExecute",
            type: "(data?: onApiErrorData) => void",
            require: false,
            description:
                "Función que se ejecuta cuando ocurre un error en la API.",
        },
    ],
    returns: [
        {
            id: "onApiError",
            type: "(data?: onApiErrorData) => void",
            description:
                "Función que permite ejecutar manualmente el manejo de errores de la API.",
        },
    ],
    useExample: [
        {
            text: "Detectar error de API",
            content: `useApiError({ onActionExecute: (error) => console.error(error) })`,
        },
        {
            text: "Ejecutar manualmente un error de API",
            content: `const { onApiErrorError } = useApiError();
onApiErrorError({ message: "Error de autenticación" });`,
        },
    ],
};
