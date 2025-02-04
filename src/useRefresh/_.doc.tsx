export default {
    id: "useRefresh",
    name: "useRefresh",
    description:
        "El hook useRefresh permite gestionar un estado de actualización basado en identificadores únicos, útil para forzar la recarga de datos en componentes específicos.",
    props: [
        {
            id: "props",
            type: "useRefreshProps",
            require: false,
            description: "Propiedades opcionales para la configuración del hook.",
        }
    ],
    returns: [
        {
            id: "data",
            type: "useRefreshData",
            description: "Objeto que almacena los timestamps de las últimas actualizaciones por ID.",
        },
        {
            id: "onRefresh",
            type: "(ids: string | string[]) => void",
            description: "Función que actualiza los timestamps de los identificadores proporcionados, forzando una recarga de datos.",
        }
    ],
};
