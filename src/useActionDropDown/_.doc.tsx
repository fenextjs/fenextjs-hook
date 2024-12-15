export default {
    id: "useActionDropDown",
    name: "useActionDropDown",
    description:
        "El hook useActionDropDown permite gestionar acciones de apertura, cierre y toggle de un dropdown mediante el uso del hook useAction.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            description: "Nombre único para identificar el dropdown en el contexto de las acciones.",
        },
        {
            id: "onChange",
            type: "(e?: boolean) => void",
            require: false,
            description: "Función que se ejecuta cuando se detecta un cambio en el estado del dropdown (activo o cerrado).",
        },
    ],
    returns: [
        {
            id: "onClose",
            type: "() => void",
            description:
                "Función que cierra el dropdown ejecutando la acción correspondiente con el valor 'false'.",
        },
        {
            id: "onActive",
            type: "() => void",
            description:
                "Función que activa el dropdown ejecutando la acción correspondiente con el valor 'true'.",
        },
        {
            id: "onToogle",
            type: "() => void",
            description:
                "Función que alterna el estado del dropdown sin pasar un valor específico.",
        },
    ],
    useExample: [
        {
            text: "Cerrar dropdown",
            content: `const { onClose } = useActionDropDown({ name: "example", onChange: console.log });
onClose();`,
        },
        {
            text: "Abrir dropdown",
            content: `const { onActive } = useActionDropDown({ name: "example" });
onActive();`,
        },
        {
            text: "Alternar estado del dropdown",
            content: `const { onToogle } = useActionDropDown({ name: "example" });
onToogle();`,
        },
    ],
};
