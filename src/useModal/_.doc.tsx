export default {
    id: "useModal",
    name: "useModal",
    description: "El hook useModal gestiona el estado de visibilidad de un modal, permitiendo controlarlo mediante props y almacenamiento local.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            description: "Nombre único del modal, utilizado para su identificación.",
        },
        {
            id: "nameLocalStorage",
            type: "string",
            require: false,
            description: "Nombre de la clave en el almacenamiento local para guardar el estado del modal.",
        },
        {
            id: "activeByNameLocalStorage",
            type: "boolean",
            require: false,
            description: "Indica si el estado del modal debe ser gestionado a través del almacenamiento local basado en su nombre.",
        },
        {
            id: "activeByNameContentLocalStorage",
            type: "boolean",
            require: false,
            description: "Indica si el contenido del estado del modal debe ser almacenado localmente basado en su nombre.",
        },
        {
            id: "active",
            type: "boolean",
            require: false,
            description: "Estado de visibilidad del modal, si es true, el modal se muestra.",
        },
        {
            id: "defaultActive",
            type: "boolean",
            require: false,
            description: "Estado inicial del modal al montarse, por defecto es false.",
        },
        {
            id: "onActive",
            type: "() => void",
            require: false,
            description: "Función que se ejecuta al activar el modal.",
        },
        {
            id: "onClose",
            type: "() => void",
            require: false,
            description: "Función que se ejecuta al cerrar el modal.",
        },
        {
            id: "onChange",
            type: "(d: boolean) => void",
            require: false,
            description: "Función que se ejecuta al cambiar el estado de visibilidad del modal.",
        },
        {
            id: "disabled",
            type: "boolean",
            require: false,
            description: "Indica si el modal está deshabilitado, previniendo su activación.",
        },
    ],
    useExample: [
        {
            text: "Uso básico",
            content: `const { active, onActive, onClose } = useModal({ 
    name: "myModal", 
    defaultActive: false, 
    onActive: () => console.log("Modal abierto"), 
    onClose: () => console.log("Modal cerrado") 
});`,
        },
        {
            text: "Controlar el estado desde el almacenamiento local",
            content: `const { active, onActive } = useModal({ 
    name: "myModal", 
    nameLocalStorage: "myModalState", 
    activeByNameLocalStorage: true 
});`,
        },
        {
            text: "Deshabilitar el modal",
            content: `const { active } = useModal({ 
    name: "myModal", 
    disabled: true 
});`,
        },
    ],
};
