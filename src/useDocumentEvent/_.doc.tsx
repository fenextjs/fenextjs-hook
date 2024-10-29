export default {
    id: "useDocumentEvent",
    name: "useDocumentEvent",
    description:
        "El hook useDocumentEvent permite agregar y eliminar eventos del documento de forma dinámica según las propiedades especificadas.",
    props: [
        {
            id: "useDocumentEventProps",
            type: "{ [key in TypeListenerKeyFunctions]?: TypeListenerFunctions<key> }",
            require: false,
            description:
                "Objeto donde las claves son nombres de eventos del documento y los valores son funciones a ejecutar cuando el evento ocurre.",
        },
    ],
    returns: [
        {
            id: "onReload",
            type: "() => void",
            description:
                "Función que elimina y vuelve a agregar los eventos, útil para actualizar los listeners en tiempo real.",
        },
    ],
    useExample: [
        {
            text: "Uso básico con evento 'click'",
            content: `useDocumentEvent({ click: (e) => console.log("Documento clickeado:", e) });`,
        },
        {
            text: "Múltiples eventos con diferentes funciones",
            content: `useDocumentEvent({ 
                    click: (e) => console.log("Click en el documento:", e), 
                    keydown: (e) => console.log("Tecla presionada:", e.key) 
                });`,
        },
        {
            text: "Recargar listeners manualmente",
            content: `const { onReload } = useDocumentEvent({ mousemove: (e) => console.log("Movimiento del mouse:", e) });
                onReload(); // Vuelve a cargar los listeners manualmente.`,
        },
    ],
};
