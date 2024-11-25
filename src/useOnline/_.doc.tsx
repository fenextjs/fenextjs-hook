export default {
    id: "useOnline",
    name: "useOnline",
    description:
        "El hook useOnline permite detectar en tiempo real si el usuario está conectado a internet. También permite ejecutar funciones personalizadas cuando cambia el estado de conexión.",
    props: [
        {
            id: "onOnline",
            type: "() => void",
            require: false,
            description:
                "Función que se ejecuta automáticamente cuando el usuario vuelve a estar en línea.",
        },
        {
            id: "onOffline",
            type: "() => void",
            require: false,
            description:
                "Función que se ejecuta automáticamente cuando el usuario pierde la conexión a internet.",
        },
    ],
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
        {
            text: "Ejecutar funciones al cambiar el estado",
            content: `useOnline({
    onOnline: () => console.log("El usuario está en línea."),
    onOffline: () => console.log("El usuario está desconectado."),
});`,
        },
    ],
};
