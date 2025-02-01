export default {
    id: "useWindowRouter",
    name: "useWindowRouter",
    description:
        "El hook `useWindowRouter` es una implementación de un enrutador basado en `window.location`. Proporciona funcionalidades similares a las de un enrutador de Next.js, pero utilizando la API nativa del navegador para manejar la navegación.",
    props: [],
    returns: [
        {
            id: "asPath",
            type: "string",
            description:
                "La ruta completa actual, incluyendo el pathname, los parámetros de consulta (query) y el hash.",
        },
        {
            id: "back",
            type: "() => void",
            description: "Navega hacia atrás en el historial del navegador.",
        },
        {
            id: "forward",
            type: "() => void",
            description: "Navega hacia adelante en el historial del navegador.",
        },
        {
            id: "isReady",
            type: "boolean",
            description:
                "Indica si el enrutador está listo. Siempre es `true` en este hook, ya que `window.location` está siempre disponible.",
        },
        {
            id: "pathname",
            type: "string",
            description: "La ruta actual (pathname) de la URL.",
        },
        {
            id: "push",
            type: "(url: string) => void",
            description:
                "Navega a una nueva URL y añade una entrada al historial del navegador.",
        },
        {
            id: "query",
            type: "object",
            description:
                "Un objeto que contiene los parámetros de consulta (query) de la URL.",
        },
        {
            id: "reload",
            type: "() => void",
            description: "Recarga la página actual.",
        },
        {
            id: "replace",
            type: "(url: string) => void",
            description:
                "Reemplaza la URL actual sin añadir una nueva entrada al historial del navegador.",
        },
        {
            id: "route",
            type: "string",
            description: "La ruta actual (pathname) de la URL.",
        },
    ],
    useExample: [
        {
            text: "Navegar a una nueva URL",
            content: `const { push } = useWindowRouter();
push('/nueva-ruta');`,
        },
        {
            text: "Reemplazar la URL actual",
            content: `const { replace } = useWindowRouter();
replace('/otra-ruta');`,
        },
        {
            text: "Navegar hacia atrás",
            content: `const { back } = useWindowRouter();
back();`,
        },
        {
            text: "Navegar hacia adelante",
            content: `const { forward } = useWindowRouter();
forward();`,
        },
        {
            text: "Recargar la página",
            content: `const { reload } = useWindowRouter();
reload();`,
        },
    ],
    extras: [
        {
            id: "window.location",
            title: "window.location",
            description:
                "El hook utiliza la API nativa del navegador `window.location` para manejar la navegación y el historial.",
            tableItems: [
                {
                    Nombre: "pathname",
                    Descripcion: "La ruta actual de la URL.",
                    Default: "window.location.pathname",
                },
                {
                    Nombre: "query",
                    Descripcion: "Los parámetros de consulta de la URL.",
                    Default: "new URLSearchParams(window.location.search)",
                },
                {
                    Nombre: "hash",
                    Descripcion: "El hash de la URL.",
                    Default: "window.location.hash",
                },
            ],
        },
    ],
};
