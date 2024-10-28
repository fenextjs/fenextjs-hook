export default {
    id: "useModal",
    name: "useModal",
    description: "El hook `useModal` controla el estado de un modal con opciones de almacenamiento local y personalización de eventos de activación y cierre.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            description: "Identificador único para el modal.",
        },
        {
            id: "nameLocalStorage",
            type: "string",
            require: false,
            description: "Clave utilizada para almacenar el estado activo del modal en el almacenamiento local.",
        },
        {
            id: "activeByNameLocalStorage",
            type: "boolean",
            require: false,
            description: "Si está activo, permite controlar el estado del modal a través del almacenamiento local usando el último nombre almacenado.",
            defaultValue: "false",
        },
        {
            id: "activeByNameContentLocalStorage",
            type: "boolean",
            require: false,
            description: "Permite controlar el estado del modal usando todos los nombres almacenados en el almacenamiento local.",
            defaultValue: "false",
        },
        {
            id: "active",
            type: "boolean",
            require: false,
            description: "Estado de activación del modal pasado como propiedad.",
        },
        {
            id: "defaultActive",
            type: "boolean",
            require: false,
            description: "Valor inicial del estado activo del modal.",
        },
        {
            id: "onActive",
            type: "() => void",
            require: false,
            description: "Función que se ejecuta cuando el modal se activa.",
        },
        {
            id: "onClose",
            type: "() => void",
            require: false,
            description: "Función que se ejecuta cuando el modal se cierra.",
        },
        {
            id: "onChange",
            type: "(d: boolean) => void",
            require: false,
            description: "Función que se ejecuta al cambiar el estado del modal.",
        },
        {
            id: "disabled",
            type: "boolean",
            require: false,
            description: "Deshabilita las acciones sobre el modal si está establecido en `true`.",
            defaultValue: "false",
        }
    ],
    returns: [
        {
            id: "active",
            type: "boolean",
            description: "Estado actual del modal, considerando el valor almacenado y el estado de recarga.",
        },
        {
            id: "activeNameLast",
            type: "boolean",
            description: "Indica si el nombre del modal es el último en la lista del almacenamiento local.",
        },
        {
            id: "activeName",
            type: "boolean",
            description: "Indica si el nombre del modal está presente en la lista del almacenamiento local.",
        },
        {
            id: "listNamesLocalStorage",
            type: "string[]",
            description: "Lista de nombres de modales almacenados en el almacenamiento local.",
        },
        {
            id: "onChange",
            type: "(d: boolean) => void",
            description: "Función para actualizar el estado del modal.",
        },
        {
            id: "onActive",
            type: "() => void",
            description: "Función para activar el modal.",
        },
        {
            id: "onClose",
            type: "() => void",
            description: "Función para cerrar el modal.",
        }
    ],
    useExample: [
        {
            text: "Uso básico del hook useModal",
            content: `const { active, onActive, onClose } = useModal({
                    name: "myModal",
                    defaultActive: false,
                    onActive: () => console.log("Modal activado"),
                    onClose: () => console.log("Modal cerrado")
                });`
        },
        {
            text: "Control de estado usando almacenamiento local",
            content: `const { active, listNamesLocalStorage } = useModal({
                    name: "myModal",
                    nameLocalStorage: "modalState",
                    activeByNameLocalStorage: true,
                    onChange: (isActive) => console.log("Estado del modal:", isActive)
                });`
        }
    ]
};
