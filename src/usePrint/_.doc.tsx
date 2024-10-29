export default  {
    id: "usePrintIframe",
    name: "usePrintIframe",
    description: "El hook usePrintIframe permite gestionar la impresión de contenido en un iframe, configurando una URL y retraso opcional.",
    props: [
        {
            id: "urlBase",
            type: "string",
            require: false,
            description: "URL base para la ruta de impresión. Valor predeterminado: '/print'.",
        },
        {
            id: "url",
            type: "string",
            require: true,
            description: "URL específica a cargar en el iframe para la impresión.",
        },
        {
            id: "data",
            type: "T | undefined",
            require: false,
            description: "Datos que se pasarán y guardarán en el localStorage antes de imprimir.",
        },
        {
            id: "delayForPrint",
            type: "number",
            require: false,
            description: "Retraso en milisegundos antes de iniciar la impresión. Valor predeterminado: 1500.",
        }
    ],
    returns: [
        {
            id: "loader",
            type: "boolean",
            description: "Estado de carga, true si la impresión está en proceso.",
        },
        {
            id: "onPrint",
            type: "() => void",
            description: "Función para iniciar el proceso de impresión en el iframe.",
        }
    ],
    useExample: [
        {
            text: "Uso de usePrintIframe",
            content: `const { loader, onPrint } = usePrintIframe({
                    url: "/my-print-page",
                    data: { key: "value" },
                    delayForPrint: 2000
                });
                onPrint(); // Inicia la impresión`
        }
    ]
};
