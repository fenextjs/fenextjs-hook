export default {
    id: "usePagination",
    name: "usePagination",
    description:
        "El hook usePagination permite gestionar y manipular datos de paginación en una aplicación. Utiliza el hook useData internamente para manejar el estado de los datos de paginación y proporciona métodos para actualizar y cambiar estos datos.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            description:
                "Nombre único para diferenciar distintas instancias de paginación.",
        },
        {
            id: "onChage",
            type: "(data: PaginationDataProps) => void",
            require: false,
            description:
                "Función que se ejecuta cuando los datos de paginación cambian.",
        },
    ],
    returns: [
        {
            id: "data",
            type: "PaginationDataProps",
            description: "Los datos actuales de paginación.",
        },
        {
            id: "setData",
            type: "(data: PaginationDataProps) => void",
            description:
                "Función para establecer los datos de paginación directamente.",
        },
        {
            id: "onChangeData",
            type: "(data: PaginationDataProps) => void",
            description: "Función para cambiar un solo dato de paginación.",
        },
        {
            id: "setDataFunction",
            type: "(fn: (data: PaginationDataProps) => PaginationDataProps) => void",
            description:
                "Función para actualizar los datos de paginación usando una función de callback.",
        },
    ],
    useExample: [
        {
            text: "Uso básico de usePagination",
            content: `const { data, setData } = usePagination({
    name: "pagination-example",
    onChage: (newData) => console.log("Datos de paginación actualizados:", newData)
});`,
        },
        {
            text: "Actualizar datos de paginación",
            content: `const { setData } = usePagination({ name: "pagination-example" });
setData({ page: 1, npage: 10 });`,
        },
        {
            text: "Usar setDataFunction para actualizar datos",
            content: `const { setDataFunction } = usePagination({ name: "pagination-example" });
setDataFunction((prevData) => ({ ...prevData, page: prevData.page + 1 }));`,
        },
    ],
};
