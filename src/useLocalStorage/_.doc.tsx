export default {
    id: "useLocalStorage",
    name: "useLocalStorage",
    description:
        "El hook `useLocalStorage` permite interactuar con el almacenamiento local del navegador, ofreciendo funcionalidades como cargar, actualizar y eliminar valores de manera reactiva.",
    props: [
        {
            id: "name",
            type: "string",
            require: true,
            description:
                "Nombre clave utilizada para identificar el valor en el almacenamiento local.",
        },
        {
            id: "defaultValue",
            type: "T",
            require: false,
            description:
                "Valor predeterminado que se utiliza si no se encuentra un valor en el almacenamiento local.",
        },
        {
            id: "parse",
            type: "(value: any) => T",
            require: false,
            description:
                "Función para convertir el valor almacenado en un formato específico.",
        },
        {
            id: "updateValue",
            type: "(oldValue: O, newValue: T) => T",
            require: false,
            description:
                "Función que define cómo actualizar el valor almacenado con base en el valor anterior.",
        },
    ],
    returns: [
        {
            id: "load",
            type: "boolean",
            description: "Indica si useLocalStorage finalizo su carga.",
        },
        {
            id: "value",
            type: "T | undefined",
            description:
                "El valor actualmente almacenado en el almacenamiento local.",
        },
        {
            id: "setLocalStorage",
            type: "(newValue: T) => void",
            description:
                "Función para actualizar el valor en el almacenamiento local.",
        },
        {
            id: "onClearLocalStorage",
            type: "() => void",
            description:
                "Función para eliminar el valor asociado del almacenamiento local.",
        },
    ],
    useExample: [
        {
            text: "Cargar un valor inicial",
            content: `const { value, load } = useLocalStorage({ name: "example_key", defaultValue: "Default" });`,
        },
        {
            text: "Actualizar un valor",
            content: `const { setLocalStorage } = useLocalStorage({ name: "example_key" });
setLocalStorage("Nuevo valor");
            `,
        },
        {
            text: "Eliminar un valor",
            content: `const { onClearLocalStorage } = useLocalStorage({ name: "example_key" });
onClearLocalStorage();
            `,
        },
        {
            text: "Usar una función personalizada para parsear valores",
            content: `const { value } = useLocalStorage<number>({ 
    name: "number_key", 
    defaultValue: 0, 
    parse: (v) => parseInt(v, 10) 
});
            `,
        },
    ],
};
