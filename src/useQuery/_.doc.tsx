export default {
    id: "useQuery",
    name: "useQuery",
    description:
        "El hook `useQuery` proporciona acceso y control sobre los parámetros de consulta en la URL, permitiendo manipularlos y reaccionar a sus cambios.",
    props: [
        {
            id: "ignoreQuerys",
            type: "[id: keyof T]",
            require: false,
            description:
                "Lista de claves de los parámetros de consulta que deben ser ignorados.",
        },
        {
            id: "parseQuery",
            type: "(data: ParsedUrlQuery) => T",
            require: false,
            description:
                "Función para transformar los parámetros de consulta en el formato esperado.",
        },
    ],
    extras: [
        {
            id: "QueryDataDefault",
            title: "QueryDataDefault",
            description:
                "Interfaz de los parámetros de consulta predeterminados.",
            tableItems: [
                {
                    Nombre: "id",
                    Descripcion: "ID único.",
                    Default: "undefined",
                },
                {
                    Nombre: "search",
                    Descripcion: "Término de búsqueda.",
                    Default: "''",
                },
                {
                    Nombre: "searchAddress",
                    Descripcion: "Dirección de búsqueda.",
                    Default: "''",
                },
                {
                    Nombre: "tab",
                    Descripcion: "Nombre de la pestaña activa.",
                    Default: "'all'",
                },
                { Nombre: "page", Descripcion: "Página actual.", Default: "0" },
                {
                    Nombre: "npage",
                    Descripcion: "Número de elementos por página.",
                    Default: "10",
                },
                {
                    Nombre: "totalpage",
                    Descripcion: "Total de páginas.",
                    Default: "100",
                },
                {
                    Nombre: "allitems",
                    Descripcion: "Total de elementos.",
                    Default: "1000",
                },
                {
                    Nombre: "start",
                    Descripcion: "Inicio del rango.",
                    Default: "undefined",
                },
                {
                    Nombre: "end",
                    Descripcion: "Fin del rango.",
                    Default: "undefined",
                },
                {
                    Nombre: "order",
                    Descripcion: "Orden de los elementos.",
                    Default: "undefined",
                },
                {
                    Nombre: "orderBy",
                    Descripcion: "Campo por el cual ordenar.",
                    Default: "undefined",
                },
                {
                    Nombre: "exportBy",
                    Descripcion: "Exportaciones adicionales.",
                    Default: "[]",
                },
            ],
        },
    ],
    returns: [
        {
            id: "load",
            type: "boolean",
            description: "Indica si el router está listo.",
        },
        {
            id: "query",
            type: "T",
            description: "Los parámetros de consulta actuales en formato `T`.",
        },
        {
            id: "setQuery",
            type: "(query: T) => boolean",
            description:
                "Función para sobrescribir los parámetros de consulta.",
        },
        {
            id: "onConcatQuery",
            type: "(newQuery: T) => boolean",
            description:
                "Función para agregar nuevos parámetros de consulta sin sobrescribir los existentes.",
        },
        {
            id: "onChangeQuery",
            type: "(id: keyof T) => (value: T[keyof T]) => boolean",
            description:
                "Devuelve una función que modifica un parámetro específico.",
        },
        {
            id: "onDeleteQuery",
            type: "(id: keyof T) => boolean",
            description:
                "Función para eliminar un parámetro de consulta específico.",
        },
        {
            id: "isChange",
            type: "boolean",
            description: "Indica si los parámetros de consulta han cambiado.",
        },
    ],
    useExample: [
        {
            text: "Uso básico",
            content: `const { query, setQuery } = useQuery();
setQuery({ search: "example" });`,
        },
        {
            text: "Agregar nuevos parámetros",
            content: `const { onConcatQuery } = useQuery();
onConcatQuery({ page: 2 });`,
        },
        {
            text: "Eliminar un parámetro",
            content: `const { onDeleteQuery } = useQuery();
onDeleteQuery("search");`,
        },
        {
            text: "Definir un formato personalizado",
            content: `const { query } = useQuery<{ customParam: string }>({
    parseQuery: (data) => ({
        customParam: data?.customParam ?? "",
    }),
});`,
        },
    ],
};
