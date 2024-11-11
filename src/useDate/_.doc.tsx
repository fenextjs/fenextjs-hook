export default {
    id: "useDate",
    name: "useDate",
    description:
        "El hook useDate gestiona una instancia de FenextjsDate para manejar la fecha y ejecutar un callback opcional.",
    props: [
        {
            id: "defaultDate",
            type: "Date",
            require: false,
            description:
                "Fecha predeterminada que se establece al inicializar el hook.",
        },
        {
            id: "onCallback",
            type: "(dateString: string) => void",
            require: false,
            description:
                "Función de callback que se ejecuta cuando cambia la fecha.",
        },
        // Otros props de FenextjsDateProps se describen aquí si es necesario.
    ],
    returns: [
        {
            id: "date",
            type: "FenextjsDate",
            description:
                "Instancia de FenextjsDate que permite manejar y manipular la fecha.",
        },
    ],
    useExample: [
        {
            text: "Uso básico de useDate",
            content: `const date = useDate({
    defaultDate: new Date(),
    onCallback: (dateString) => console.log("Nueva fecha:", dateString),
});
console.log(date.format()); // Ejemplo de uso de una función en FenextjsDate`,
        },
    ],
};
