export default {
    id: "useSessionStorage",
    name: "useSessionStorage",
    description:
        "El hook `useSessionStorage` permite interactuar con el almacenamiento de sesión del navegador, ofreciendo funcionalidades como cargar, actualizar y eliminar valores de manera reactiva.",
    props: [
        {
            id: "name",
            type: "string",
            require: true,
            description:
                "Nombre clave utilizada para identificar el valor en el almacenamiento de sesión.",
        },
        {
            id: "defaultValue",
            type: "T",
            require: false,
            description:
                "Valor predeterminado que se utiliza si no se encuentra un valor en el almacenamiento de sesión.",
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
            description: "Indica si useSessionStorage finalizo su carga.",
        },
        {
            id: "value",
            type: "T | undefined",
            description:
                "El valor actualmente almacenado en el almacenamiento de sesión.",
        },
        {
            id: "setSessionStorage",
            type: "(newValue: T) => void",
            description:
                "Función para actualizar el valor en el almacenamiento de sesión.",
        },
        {
            id: "onClearSessionStorage",
            type: "() => void",
            description:
                "Función para eliminar el valor asociado del almacenamiento de sesión.",
        },
    ],
    useExample: [
        {
            text: "Cargar un valor inicial",
            content: `const { value, load } = useSessionStorage({ name: "example_key", defaultValue: "Default" });`,
        },
        {
            text: "Actualizar un valor",
            content: `const { setSessionStorage } = useSessionStorage({ name: "example_key" });
setSessionStorage("Nuevo valor");
            `,
        },
        {
            text: "Eliminar un valor",
            content: `const { onClearSessionStorage } = useSessionStorage({ name: "example_key" });
onClearSessionStorage();
            `,
        },
        {
            text: "Usar una función personalizada para parsear valores",
            content: `const { value } = useSessionStorage<number>({ 
    name: "number_key", 
    defaultValue: 0, 
    parse: (v) => parseInt(v, 10) 
});
            `,
        },
    ],
};
