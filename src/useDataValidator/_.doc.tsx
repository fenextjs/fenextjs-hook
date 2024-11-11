export default {
    id: "useDataValidator",
    name: "useDataValidator",
    description:
        "El hook useDataValidator permite validar datos de entrada utilizando una clase de validación opcional, y proporciona el estado de validación.",
    props: [
        {
            id: "data",
            type: "T",
            require: true,
            description: "Los datos que se van a validar.",
        },
        {
            id: "validator",
            type: "FenextjsValidatorClass<T>",
            require: false,
            description:
                "Instancia opcional de una clase de validación personalizada para validar los datos.",
        },
        {
            id: "autoOnValidate",
            type: "boolean",
            require: false,
            description:
                "Determina si la validación se debe ejecutar automáticamente al cambiar los datos.",
            default: true,
        },
    ],
    returns: [
        {
            id: "isValidData",
            type: "true | ErrorFenextjs | undefined",
            description:
                "Indica si los datos son válidos (`true`), si hay un error (`ErrorFenextjs`), o si aún no se ha validado (`undefined`).",
        },
        {
            id: "onValidateData",
            type: "() => void",
            description:
                "Función que ejecuta la validación de los datos de forma manual.",
        },
    ],
    useExample: [
        {
            text: "Validación automática de datos",
            content: `const { isValidData, onValidateData } = useDataValidator({
    data: myData,
    validator: new FenextjsValidatorClass(),
});
console.log(isValidData); // Muestra el estado de la validación`,
        },
        {
            text: "Validación manual de datos",
            content: `const { isValidData, onValidateData } = useDataValidator({
    data: myData,
    validator: new FenextjsValidatorClass(),
    autoOnValidate: false,
});
onValidateData(); // Ejecuta la validación manualmente`,
        },
    ],
};
