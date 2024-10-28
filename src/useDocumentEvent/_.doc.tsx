export default {
    id: "useDocumentEvent",
    name: "useDocumentEvent",
    description: "El hook useDocumentEvent permite manejar eventos del documento de manera sencilla, registrando funciones que se ejecutan cuando ocurren ciertos eventos.",
    props: [
        {
            id: "props",
            type: "useDocumentEventProps<K>",
            require: true,
            description: "Objeto que contiene las funciones que se ejecutarán en respuesta a los eventos del documento.",
        },
    ],
    extras: [
        {
            id: "TypeListenerKeyFunctions",
            title: "TypeListenerKeyFunctions",
            description: "Tipos de eventos que se pueden escuchar en el documento.",
            tableItems: [
                {
                    Nombre: "click",
                    Descripcion: "Se dispara cuando el usuario hace clic en el documento.",
                },
                {
                    Nombre: "keydown",
                    Descripcion: "Se dispara cuando se presiona una tecla.",
                },
                {
                    Nombre: "resize",
                    Descripcion: "Se dispara cuando se cambia el tamaño de la ventana.",
                },
                // Agrega otros eventos según sea necesario
            ],
        },
    ],
    useExample: [
        {
            text: "Escuchar clics en el documento",
            content: `useDocumentEvent({
    click: (ev) => {
        console.log("Clic en el documento", ev);
    }
});`,
        },
        {
            text: "Escuchar cambios de tamaño de ventana",
            content: `useDocumentEvent({
    resize: (ev) => {
        console.log("Cambio de tamaño de ventana", ev);
    }
});`,
        },
        {
            text: "Escuchar eventos de teclado",
            content: `useDocumentEvent({
    keydown: (ev) => {
        console.log("Tecla presionada", ev.key);
    }
});`,
        },
    ],
};
