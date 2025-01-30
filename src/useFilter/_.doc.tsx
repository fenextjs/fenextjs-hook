export default {
    id: "useFilter",
    name: "useFilter",
    description:
        "El hook useFilter permite manejar datos de filtrado combinando búsqueda, fechas y propiedades personalizadas.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            description:
                "Nombre único para el filtro, utilizado en el contexto global.",
            default: "undefined",
        },
        {
            id: "onChage",
            type: "(data: useFilterDataProps<CF>) => void",
            require: false,
            description:
                "Función que se ejecuta cuando cambian los datos del filtro.",
            default: "undefined",
        },
    ],
    returns: [
        {
            id: "useData",
            type: "useData<useFilterDataProps<CF>>",
            description:
                "Retorna los datos de filtrado gestionados con useData, incluyendo búsqueda, fechas y propiedades personalizadas.",
        },
    ],
    useExample: [
        {
            text: "Uso básico del filtro",
            content: `const { data ,onChangeData} = useFilter({ name: 'productos' });
onChangeData("search")("texto de busqueda")`,
        },
        {
            text: "Uso con función de cambio",
            content: `const { data } = useFilter({
    name: 'usuarios',
    onChage: (filterData) => console.log('Filtro cambiado:', filterData),
});`,
        },
    ],
};
