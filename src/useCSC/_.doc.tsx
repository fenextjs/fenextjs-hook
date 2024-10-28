export default {
    id: "useCSC",
    name: "useCSC",
    description: "El hook useCSC facilita la selección de país, estado y ciudad, cargando datos geográficos y permitiendo la actualización de valores seleccionados.",
    props: [
        {
            id: "defaultValue",
            type: "CSCProps",
            require: false,
            description: "Valores por defecto para el país, estado y ciudad seleccionados.",
        },
        {
            id: "value",
            type: "CSCProps",
            require: false,
            description: "Valores actuales de país, estado y ciudad en uso.",
        },
        {
            id: "onChange",
            type: "(value: CSCProps) => void",
            require: false,
            description: "Función para manejar cambios en los valores de país, estado y ciudad.",
        },
        {
            id: "defaultValueJsonString",
            type: "CSCStringProps",
            require: false,
            description: "Valor por defecto como JSON string de los datos de país, estado y ciudad.",
        },
        {
            id: "valueJsonString",
            type: "CSCStringProps",
            require: false,
            description: "Valor actual como JSON string de los datos de país, estado y ciudad.",
        },
        {
            id: "onChangeJsonString",
            type: "(value: CSCStringProps) => void",
            require: false,
            description: "Función para manejar cambios en el JSON string de país, estado y ciudad.",
        },
    ],
    useExample: [
        {
            text: "Uso básico de useCSC",
            content: `const { countrys, states, citys, onChangeCSC, value } = useCSC();`
        },
        {
            text: "Seleccionar un país y cargar estados",
            content: `onChangeCSC("country")({ id: 1, text: "México" });`
        },
        {
            text: "Seleccionar un estado y cargar ciudades",
            content: `onChangeCSC("state")({ id: 2, text: "Jalisco" });`
        }
    ]
};
