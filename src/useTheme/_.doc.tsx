export default {
    id: "useTheme",
    name: "useTheme",
    description:
        "El hook useTheme permite gestionar y aplicar el tema de la aplicación, almacenándolo en el localStorage y configurándolo en el DOM.",
    props: [],
    extras: [
        {
            id: "ThemeType",
            title: "ThemeType",
            description:
                "Define los posibles valores para el tema, como 'auto', 'light', o 'dark', utilizados para establecer el tema en la aplicación.",
            tableItems: [
                {
                    Nombre: "auto",
                    Descripcion:
                        "Configura automáticamente el tema según las preferencias del sistema.",
                    Default: "auto",
                },
                {
                    Nombre: "light",
                    Descripcion: "Configura el tema claro.",
                    Default: "N/A",
                },
                {
                    Nombre: "dark",
                    Descripcion: "Configura el tema oscuro.",
                    Default: "N/A",
                },
            ],
        },
    ],
    returns: [
        {
            id: "theme",
            type: "ThemeType",
            description:
                "El tema actualmente almacenado, que puede ser 'auto', 'light', o 'dark'.",
        },
        {
            id: "setTheme",
            type: "(newTheme: ThemeType) => void",
            description:
                "Función para establecer un nuevo tema, almacenándolo en localStorage y aplicándolo al DOM.",
        },
    ],
    useExample: [
        {
            text: "Obtener y establecer el tema",
            content: `const { theme, setTheme } = useTheme();
console.log(theme); // Muestra el tema actual
setTheme("dark"); // Cambia el tema a oscuro`,
        },
    ],
};
