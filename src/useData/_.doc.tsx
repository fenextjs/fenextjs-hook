export default {
    id: "useData",
    name: "useData",
    description: "El hook useData gestiona el estado y cambios de datos con validación y callbacks.",
    props: [
        {
            id: "defaultData",
            type: "T",
            require: true,
            description: "Valor predeterminado para el dato a gestionar.",
        },
        {
            id: "options",
            type: "useDataOptions<T, M, RT, RM, ET, EM>",
            require: false,
            description: "Opciones de configuración para el hook.",
        },
    ],
    extras: [
        {
            id: "useDataOptions",
            title: "useDataOptions",
            description: "Opciones adicionales para el hook useData:",
            tableItems: [
                {
                    Nombre: "data",
                    Descripcion: "Dato actual gestionado por el hook.",
                    Default: "undefined",
                },
                {
                    Nombre: "refreshDataIfChangeDefaultData",
                    Descripcion: "Cambia los datos si se modifica defaultData.",
                    Default: "false",
                },
                {
                    Nombre: "onChangeDataAfter",
                    Descripcion: "Callback ejecutado después de cambiar los datos.",
                    Default: "undefined",
                },
                {
                    Nombre: "onDeleteDataAfter",
                    Descripcion: "Callback ejecutado después de eliminar los datos.",
                    Default: "undefined",
                },
                {
                    Nombre: "onChangeDataMemoAfter",
                    Descripcion: "Callback ejecutado después de cambiar los datos memorizados.",
                    Default: "undefined",
                },
                {
                    Nombre: "onMemo",
                    Descripcion: "Función para memoizar los datos.",
                    Default: "undefined",
                },
                {
                    Nombre: "validator",
                    Descripcion: "Instancia de FenextjsValidatorClass para validar datos.",
                    Default: "undefined",
                },
                {
                    Nombre: "onSubmitData",
                    Descripcion: "Callback para enviar datos válidos.",
                    Default: "undefined",
                },
                {
                    Nombre: "onAfterSubmitDataOk",
                    Descripcion: "Callback ejecutado después de un envío exitoso.",
                    Default: "undefined",
                },
                {
                    Nombre: "afterSubmitDataSetIsChangeFalse",
                    Descripcion: "Establece si después del envío se marca como no cambiado.",
                    Default: "false",
                },
                {
                    Nombre: "autoOnValidate",
                    Descripcion: "Habilita la validación automática.",
                    Default: "false",
                },
                {
                    Nombre: "env_log",
                    Descripcion: "Configura qué eventos se registran en la consola.",
                    Default: "undefined",
                },
            ],
        },
    ],
    useExample: [
        {
            text: "Uso básico",
            content: `const { data, setData } = useData(initialData);`,
        },
        {
            text: "Con validación",
            content: `const { data, setData } = useData(initialData, { validator: new FenextjsValidatorClass() });`,
        },
        {
            text: "Con callback de cambio",
            content: `const { data, setData } = useData(initialData, { onChangeDataAfter: (data) => console.log(data) });`,
        },
        {
            text: "Con opciones de envío",
            content: `const { data, setData } = useData(initialData, { onSubmitData: (data) => fetch('/api', { method: 'POST', body: JSON.stringify(data) }) });`,
        },
        {
            text: "Con refreshDataIfChangeDefaultData",
            content: `const { data, setData } = useData(initialData, { refreshDataIfChangeDefaultData: { active: true } });`,
        },
        {
            text: "Con env_log",
            content: `const { data, setData } = useData(initialData, { env_log: { data: true, dataError: true } });`,
        },
    ],
};
