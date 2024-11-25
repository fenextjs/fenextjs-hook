export default {
    id: "useOnline",
    name: "useOnline",
    description:
        "El hook useOnline permite detectar en tiempo real si el usuario está conectado a internet, gestionando los eventos del navegador relacionados con el estado de conexión.",
    props: [],
    extras: [],
    returns: [
        {
            id: "isOnline",
            type: "boolean",
            description:
                "Estado que indica si el usuario está conectado a internet. Retorna `true` si está en línea y `false` si no lo está.",
        },
    ],
    useExample: [
        {
            text: "Detectar estado de conexión",
            content: `const { isOnline } = useOnline();

useEffect(() => {
    console.log("Estado de conexión:", isOnline ? "En línea" : "Desconectado");
}, [isOnline]);`,
        },
    ],
};
