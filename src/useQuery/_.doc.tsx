export default {
    id: "useQuery",
    name: "useQuery",
    description: "El hook useQuery permite gestionar los parámetros de consulta en la URL, incluyendo su actualización, eliminación y verificación de cambios en Next.js.",
    props: [
        {
            id: "ignoreQuerys",
            type: "[id: keyof useQuery_QueryProps]",
            require: false,
            description: "Lista opcional de claves de consulta que deben ignorarse al obtener los parámetros de la URL.",
        }
    ],
    returns: [
        {
            id: "load",
            type: "boolean",
            description: "Indica si el enrutador (router) está listo.",
        },
        {
            id: "query",
            type: "useQuery_QueryProps",
            description: "Objeto que contiene los parámetros de consulta de la URL, mapeados y procesados.",
        },
        {
            id: "setQuery",
            type: "(query: useQuery_QueryProps) => boolean",
            description: "Función que establece los parámetros de consulta en la URL.",
        },
        {
            id: "onConcatQuery",
            type: "(newQuery: useQuery_QueryProps) => boolean",
            description: "Función que concatena nuevos parámetros de consulta con los existentes y actualiza la URL.",
        },
        {
            id: "onChangeQuery",
            type: "(id: keyof useQuery_QueryProps) => (value: any) => boolean",
            description: "Función que retorna un manejador de eventos para actualizar un parámetro específico de consulta en la URL.",
        },
        {
            id: "onDeleteQuery",
            type: "(id: keyof useQuery_QueryProps) => boolean",
            description: "Función que elimina un parámetro específico de consulta de la URL.",
        },
        {
            id: "isChange",
            type: "boolean",
            description: "Indica si los parámetros de consulta han cambiado desde la última vez.",
        }
    ],
    useExample: [
        {
            text: "Uso básico de useQuery",
            content: `const { query, setQuery, onConcatQuery, onChangeQuery, onDeleteQuery, isChange } = useQuery({
    ignoreQuerys: ["tab", "page"]
});

// Actualizar un parámetro específico
onChangeQuery("search")("new search term");

// Agregar varios parámetros
onConcatQuery({ page: 2, order: "asc" });

// Eliminar un parámetro específico
onDeleteQuery("order");

console.log(query); // Muestra los parámetros de consulta actuales`
        }
    ]
};
