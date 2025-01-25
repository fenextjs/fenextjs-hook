export default {
    id: "useStateGlobalContext",
    name: "useStateGlobalContext",
    description: "El hook useStateGlobalContext permite gestionar un estado global compartido y sincronizado entre componentes mediante el uso del DOM y acciones personalizadas.",
    props: [
        {
            id: "defaultValue",
            type: "T",
            require: true,
            description: "Valor inicial para el estado global.",
        },
        {
            id: "name",
            type: "string",
            require: false,
            description: "Nombre único para identificar el estado global dentro del DOM.",
        },
    ],
    returns: [
        {
            id: "data",
            type: "T",
            description: "El valor actual del estado global.",
        },
        {
            id: "setData",
            type: "(f: SetStateAction<T>) => void",
            description: "Función para actualizar el valor del estado global. Si se proporciona un nombre, también sincroniza la actualización con el DOM.",
        },
    ],
    useExample: [
        {
            text: "Uso básico con estado local",
            content: `const { data, setData } = useStateGlobalContext({ defaultValue: 0 });
setData(5);
console.log(data); // 5`,
        },
        {
            text: "Uso con sincronización global",
            content: `const { data, setData } = useStateGlobalContext({ name: 'globalState', defaultValue: 'Hola' });
setData('Mundo');
console.log(data); // 'Mundo'
// Otros componentes con el mismo 'name' accederán a este estado.`,
        },
        {
            text: "Actualizar estado usando una función",
            content: `const { data, setData } = useStateGlobalContext({ defaultValue: 10 });
setData((prev) => prev + 1);
console.log(data); // 11`,
        },
    ],
};
