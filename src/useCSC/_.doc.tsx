export default {
    id: "useCSC",
    name: "useCSC",
    description: "El hook useCSC proporciona funcionalidad para seleccionar País, Estado y Ciudad, cargando dinámicamente los datos relacionados.",
    props: [
        {
            id: "defaultValue",
            type: "CSCProps",
            require: false,
            description: "Valor inicial opcional que define los datos CSC por defecto.",
        },
        {
            id: "value",
            type: "CSCProps",
            require: false,
            description: "Objeto opcional que contiene el valor actual de los datos CSC seleccionados.",
        },
        {
            id: "onChange",
            type: "(data: CSCProps) => void",
            require: false,
            description: "Función de callback que se ejecuta al cambiar el valor CSC.",
        },
        {
            id: "defaultValueJsonString",
            type: "string",
            require: false,
            description: "Valor inicial opcional en formato JSON string para los datos CSC.",
        },
        {
            id: "valueJsonString",
            type: "string",
            require: false,
            description: "Cadena JSON opcional que representa el valor actual de los datos CSC.",
        },
        {
            id: "onChangeJsonString",
            type: "(data: string) => void",
            require: false,
            description: "Función de callback que se ejecuta cuando los datos CSC en formato JSON cambian.",
        },
        {
            id: "parseJson_to_String",
            type: "(data: CSCProps) => string",
            require: false,
            description: "Función para convertir CSCProps a una cadena JSON, usa parseCSC_to_CSCString si no se proporciona.",
        },
        {
            id: "parseString_to_Json",
            type: "(data: string) => CSCProps",
            require: false,
            description: "Función para convertir una cadena JSON a CSCProps, usa parseCSCString_to_CSC si no se proporciona.",
        }
    ],
    returns: [
        {
            id: "countrys",
            type: "CountryProps[]",
            description: "Array de países cargados para selección.",
        },
        {
            id: "states",
            type: "StateProps[]",
            description: "Array de estados cargados para selección, según el país seleccionado.",
        },
        {
            id: "citys",
            type: "CityProps[]",
            description: "Array de ciudades cargadas para selección, según el estado seleccionado.",
        },
        {
            id: "onChangeCSC",
            type: "(id: keyof CSCProps) => (v: CountryProps | StateProps | CityProps | undefined) => void",
            description: "Función para actualizar los datos CSC seleccionados, cargando automáticamente estados o ciudades según corresponda.",
        },
        {
            id: "value",
            type: "CSCProps",
            description: "Valor actual de los datos CSC seleccionados, combinado de los datos recibidos y el valor por defecto.",
        },
        {
            id: "loadCountrys",
            type: "boolean",
            description: "Indica si los datos de países están cargando.",
        },
        {
            id: "loadStates",
            type: "boolean",
            description: "Indica si los datos de estados están cargando.",
        },
        {
            id: "loadCitys",
            type: "boolean",
            description: "Indica si los datos de ciudades están cargando.",
        }
    ],
    useExample: [
        {
            text: "Uso básico",
            content: `const { countrys, states, citys, onChangeCSC, value } = useCSC({
                defaultValue: {
                    country: { id: 1, text: "México" },
                    state: { id: 1, text: "CDMX" },
                    city: { id: 1, text: "Coyoacán" }
                }
            });
            onChangeCSC("country")(countrys[0]);`
        },
        {
            text: "Cambiar ciudad",
            content: `const { onChangeCSC, citys } = useCSC();
                onChangeCSC("city")(citys[1]);`
        }
    ]
};
