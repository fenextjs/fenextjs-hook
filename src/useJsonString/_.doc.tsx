export default {
    id: "useJsonString",
    name: "useJsonString",
    description: "El hook useJsonString gestiona el estado y sincronización entre un valor JSON y su representación en formato string, permitiendo opcionalmente definir funciones de parseo para la conversión entre tipos.",
    props: [
        {
            id: "defaultValue",
            type: "T",
            require: false,
            description: "Valor predeterminado en formato JSON.",
        },
        {
            id: "value",
            type: "T",
            require: false,
            description: "Valor en formato JSON que se desea sincronizar.",
        },
        {
            id: "onChange",
            type: "(data: T) => void",
            require: false,
            description: "Función que se ejecuta cuando el valor en JSON cambia.",
        },
        {
            id: "defaultValueJsonString",
            type: "P",
            require: false,
            description: "Valor predeterminado en formato string.",
        },
        {
            id: "valueJsonString",
            type: "P",
            require: false,
            description: "Valor en formato string que se desea sincronizar.",
        },
        {
            id: "onChangeJsonString",
            type: "(data: P | undefined) => void",
            require: false,
            description: "Función que se ejecuta cuando el valor en formato string cambia.",
        },
        {
            id: "parseString_to_Json",
            type: "(data: P) => T | undefined",
            require: false,
            description: "Función que convierte el valor de formato string a JSON.",
        },
        {
            id: "parseJson_to_String",
            type: "(data: T) => P | undefined",
            require: false,
            description: "Función que convierte el valor de JSON a formato string.",
        }
    ],
    returns: [
        {
            id: "value",
            type: "T",
            description: "Valor calculado en formato JSON, basado en el valor string o JSON pasado como argumento.",
        },
        {
            id: "defaultValue",
            type: "T",
            description: "Valor predeterminado en formato JSON, basado en el valor string o JSON pasado como argumento.",
        },
        {
            id: "onChange",
            type: "(e: T) => void",
            description: "Función para actualizar el valor JSON y sincronizar su representación en formato string.",
        }
    ],
    useExample: [
        {
            text: "Uso básico con un valor JSON inicial",
            content: `const { value, onChange } = useJsonString({
                    value: { name: "Example" },
                    onChange: (data) => console.log("Nuevo valor JSON:", data)
                });`
        },
        {
            text: "Sincronización entre JSON y string",
            content: `const { value, onChange } = useJsonString({
                    valueJsonString: '{"name":"Example"}',
                    parseString_to_Json: JSON.parse,
                    parseJson_to_String: JSON.stringify,
                    onChangeJsonString: (data) => console.log("Nuevo valor string:", data)
                });`
        }
    ]
};
