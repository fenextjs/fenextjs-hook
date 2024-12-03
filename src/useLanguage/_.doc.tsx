export default {
    id: "useLanguage",
    name: "useLanguage",
    description:
        "El hook `useLanguage` facilita la gestión de traducciones y el cambio de idioma en una aplicación. Permite traducir palabras con base en una lista de traducciones proporcionada y manejar casos en los que no se encuentra una traducción.",
    props: [
        {
            id: "langs",
            type: "Langs",
            require: true,
            description:
                "Lista de idiomas disponibles en la aplicación, definida como un array de strings.",
        },
        {
            id: "listTranductions",
            type: "LanguageListProps<Langs>",
            require: true,
            description:
                "Un objeto que contiene las traducciones organizadas por palabra e idioma.",
        },
        {
            id: "defaultLang",
            type: "Langs[number]",
            require: false,
            description:
                "Idioma predeterminado que se usará si no se ha seleccionado otro idioma.",
        },
        {
            id: "onNoFoundTranslate",
            type: "(data: { word: string; lang: Langs[number] }) => void",
            require: false,
            description:
                "Función que se ejecuta cuando no se encuentra una traducción para una palabra específica.",
        },
        {
            id: "fallbackNoFoundTranslation",
            type: "string",
            require: false,
            description:
                "Traducción alternativa que se usará cuando no se encuentre la traducción específica para una palabra.",
        },
    ],
    returns: [
        {
            id: "onTranslate",
            type: "(word?: any) => any",
            description:
                "Función que recibe una palabra y devuelve su traducción en el idioma actual o la traducción alternativa, si no se encuentra.",
        },
        {
            id: "setCurrentLang",
            type: "(lang: Langs[number]) => void",
            description: "Función para cambiar el idioma actual.",
        },
    ],
    useExample: [
        {
            text: "Traducción básica",
            content: `const { onTranslate } = useLanguage({
    langs: ["en", "es"],
    listTranductions: {
        hello: { en: "Hello", es: "Hola" },
        world: { en: "World", es: "Mundo" },
    },
    defaultLang: "en",
});

const translatedWord = onTranslate("hello"); // "Hello" si el idioma actual es "en"`,
        },
        {
            text: "Cambio de idioma",
            content: `const { setCurrentLang } = useLanguage({
    langs: ["en", "es"],
    listTranductions: {
        goodbye: { en: "Goodbye", es: "Adiós" },
    },
    defaultLang: "es",
});

setCurrentLang("en"); // Cambia el idioma actual a "en"`,
        },
        {
            text: "Fallback para traducciones no encontradas",
            content: `const { onTranslate } = useLanguage({
    langs: ["en", "fr"],
    listTranductions: {
        welcome: { en: "Welcome", fr: "Bienvenue" },
    },
    fallbackNoFoundTranslation: "Translation not available",
});

const translation = onTranslate("nonexistent"); // "Translation not available"`,
        },
    ],
};
