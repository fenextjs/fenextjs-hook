export default {
    id: "useJsonString",
    name: "useJsonString",
    description: "El hook useJsonString gestiona la conversión entre objetos JSON y cadenas de texto, facilitando la manipulación de datos en formato JSON.",
    props: [
        {
            id: "defaultValue",
            type: "T",
            require: false,
            description: "Valor predeterminado que se utilizará si no se proporciona un valor.",
        },
        {
            id: "value",
            type: "T",
            require: false,
            description: "Valor actual que se está utilizando en el hook.",
        },
        {
            id: "onChange",
            type: "(data: T) => void",
            require: false,
            description: "Función que se ejecuta cuando el valor cambia.",
        },
        {
            id: "defaultValueJsonString",
            type: "P",
            require: false,
            description: "Valor predeterminado en forma de cadena JSON.",
        },
        {
            id: "valueJsonString",
            type: "P",
            require: false,
            description: "Valor actual en forma de cadena JSON.",
        },
        {
            id: "onChangeJsonString",
            type: "(data: P | undefined) => void",
            require: false,
            description: "Función que se ejecuta cuando el valor JSON cambia.",
        },
        {
            id: "parseString_to_Json",
            type: "(data: P) => T | undefined",
            require: false,
            description: "Función que convierte una cadena JSON en un objeto.",
        },
        {
            id: "parseJson_to_String",
            type: "(data: T) => P | undefined",
            require: false,
            description: "Función que convierte un objeto en una cadena JSON.",
        },
    ],
    extras: [
        {
            id: "parse",
            title: "Funciones de parseo",
            description: "Funciones que permiten la conversión entre formatos:",
            tableItems: [
                {
                    Nombre: "parseString_to_Json",
                    Descripcion: "Convierte una cadena JSON en un objeto.",
                    Default: "undefined",
                },
                {
                    Nombre: "parseJson_to_String",
                    Descripcion: "Convierte un objeto en una cadena JSON.",
                    Default: "undefined",
                },
            ],
        },
    ],
    useExample: [
        {
            text: "Uso básico",
            content: `const { value, onChange } = useJsonString({
    defaultValue: {},
    onChange: (data) => console.log(data),
});`,
        },
        {
            text: "Convertir cadena JSON a objeto",
            content: `const { valueJsonString, onChangeJsonString } = useJsonString({
    defaultValueJsonString: '{"key": "value"}',
    parseString_to_Json: JSON.parse,
    onChangeJsonString: (data) => console.log(data),
});`,
        },
        {
            text: "Convertir objeto a cadena JSON",
            content: `const { value, onChange } = useJsonString({
    value: { key: "value" },
    parseJson_to_String: JSON.stringify,
    onChange: (data) => console.log(data),
});`,
        },
    ],
};
