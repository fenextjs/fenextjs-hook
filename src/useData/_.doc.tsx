export default {
    id: "useData",
    name: "useData",
    description:
        "Hook personalizado para administrar y validar datos con múltiples opciones para manejar cambios, envío y estados de error.",
    props: [
        {
            id: "defaultData",
            type: "T",
            require: true,
            description: "Los datos predeterminados para inicializar el hook.",
        },
        {
            id: "options",
            type: "useDataOptions<T, M, RT, RM, ET, EM>",
            require: false,
            description:
                "Un objeto que contiene varias opciones de configuración para el hook.",
        },
    ],
    extras: [
        {
            id: "useDataOptions",
            title: "useDataOptions",
            description:
                "Opciones para personalizar el comportamiento del hook.",
            tableItems: [
                {
                    Nombre: "data",
                    Descripcion:
                        "Datos opcionales para sobrescribir los datos predeterminados.",
                },
                {
                    Nombre: "refreshDataIfChangeDefaultData",
                    Descripcion:
                        "Opciones para refrescar los datos si los datos predeterminados cambian.",
                },
                {
                    Nombre: "onChangeDataAfter",
                    Descripcion:
                        "Función de callback que se llama después de que los datos cambian.",
                },
                {
                    Nombre: "onDeleteDataAfter",
                    Descripcion:
                        "Función de callback que se llama después de que los datos se eliminan.",
                },
                {
                    Nombre: "onMemo",
                    Descripcion:
                        "Función de memoización para transformar los datos antes de pasarlos como valor memorizado.",
                },
                {
                    Nombre: "memoDependencies",
                    Descripcion:
                        "Lista de variable que depende onMemo para actualizarce o ejecutarce.",
                },
                {
                    Nombre: "validator",
                    Descripcion:
                        "Instancia de clase validadora para validar los datos de data.",
                },
                {
                    Nombre: "validatorMemo",
                    Descripcion:
                        "Instancia de clase validadora para validar los datos de dataMemo.",
                },
                {
                    Nombre: "onSubmitData",
                    Descripcion: "Función de callback para enviar los datos.",
                },
                {
                    Nombre: "onAfterSubmitDataOk",
                    Descripcion:
                        "Función de callback que se llama después de un envío éxitoso de datos.",
                },
                {
                    Nombre: "onAfterSubmitParseError",
                    Descripcion:
                        "Función de callback para manejar errores de análisis.",
                },
                {
                    Nombre: "onAfterSubmitDataError",
                    Descripcion:
                        "Función de callback para manejar errores después de enviar los datos.",
                },
                {
                    Nombre: "afterSubmitDataSetIsChangeFalse",
                    Descripcion:
                        "Determinar si se cambia el valor de isChange despues del terminar onSubmitData.",
                },
                {
                    Nombre: "onSubmitDataMemo",
                    Descripcion:
                        "Función de callback para enviar los datos de dataMemo.",
                },
                {
                    Nombre: "onAfterSubmitDataMemoOk",
                    Descripcion:
                        "Función de callback que se llama después de un envío éxitoso de datos de dataMemo.",
                },
                {
                    Nombre: "onAfterSubmitParseErrorMemo",
                    Descripcion:
                        "Función de callback para manejar errores de análisis de dataMemo.",
                },
                {
                    Nombre: "onAfterSubmitDataMemoError",
                    Descripcion:
                        "Función de callback para manejar errores después de enviar los datos de dataMemo.",
                },
                {
                    Nombre: "afterSubmitDataMemoSetIsChangeFalse",
                    Descripcion:
                        "Determinar si se cambia el valor de isChange despues del terminar onSubmitDataMemo.",
                },
                {
                    Nombre: "autoOnValidate",
                    Descripcion:
                        "Indicador para validar automáticamente los datos.",
                },
                {
                    Nombre: "env_log",
                    Descripcion:
                        "Objetos que determinar que variables se muestran en la consola.",
                },
                {
                    Nombre: "useGlobalContext",
                    Descripcion:
                        "Activar contexto global para que la data que se maneje en distintos useData, con el mismo nombre de useGlobalContext, este sincronizada. (Solo funciona despues que window cargue). **No se recomienda usar para datos sencibles**.",
                },
            ],
        },
        {
            id: "useDataOptionsRefreshDataIfChangeDefaultDataOptions",
            title: "useDataOptionsRefreshDataIfChangeDefaultDataOptions",
            description:
                "Opciones para refrescar los datos cuando los datos predeterminados cambian.",
            tableItems: [
                {
                    Nombre: "active",
                    Descripcion:
                        "Indicador para indicar si los datos deben actualizarse cuando cambian los datos predeterminados.",
                    Default: "false",
                },
                {
                    Nombre: "useReloadKeyData",
                    Descripcion:
                        "Indicador para recargar la clave de los datos cuando cambian los datos predeterminados.",
                    Default: "false",
                },
            ],
        },
        {
            id: "setDataOptions",
            title: "setDataOptions",
            description: "Opciones para configurar los datos.",
            tableItems: [
                {
                    Nombre: "useOptionsOnChangeDataAfter",
                    Descripcion:
                        "Indicador para controlar si se debe usar el callback `onChangeDataAfter` al configurar los datos.",
                    Default: "true",
                },
                {
                    Nombre: "useSetIsChange",
                    Descripcion:
                        "Indicador para controlar si el estado `isChange` debe configurarse en `true` después de configurar los datos.",
                    Default: "true",
                },
            ],
        },
    ],
    returns: [
        {
            id: "data",
            type: "T",
            description: "Datos guardados en useData.",
        },
        {
            id: "onChangeData",
            type: "(id: keyof T) => (value: typeof data[keyof T], _options?: onChangeDataOptionsProps<T>) => void",
            description: "Función para manejar los cambios en los datos.",
        },
        {
            id: "onDeleteData",
            type: "(id: keyof T) => void",
            description: "Función para eliminar datos.",
        },
        {
            id: "isChange",
            type: "boolean",
            description:
                "Valor que determina si la informacion guardada en data ha cambiado.",
        },
        {
            id: "setData",
            type: "(nData: T, optionsData?: setDataOptions) => void",
            description: "Función para asignar nuevos datos.",
        },
        {
            id: "setDataFunction",
            type: "(f: (p: T) => T, optionsData?: setDataOptions) => void",
            description:
                "Función para actualizar los datos usando una función.",
        },
        {
            id: "dataMemo",
            type: "M",
            description:
                "Datos guardados en useData y transformados con la funcion onMemo proporcionada.",
        },
        {
            id: "setIsChange",
            type: "(f: boolean) => void",
            description: "Función para actualizar la variable isChange.",
        },
        {
            id: "onRestart",
            type: "function",
            description:
                "Función para restablecer los datos a su valor default.",
        },
        {
            id: "onConcatData",
            type: "(v: Partial<T> | Array<T>) => void",
            description:
                "Función para concatenar nuevos datos a los datos actuales.",
        },
        {
            id: "keyData",
            type: "number",
            description:
                "Valor de key asignado a data, que cambia con algunos acciones.",
        },
        {
            id: "setKeyData",
            type: "(f: number) => void",
            description: "Función para actualizar la variable keyData.",
        },
        {
            id: "onReloadKeyData",
            type: "function",
            description:
                "Función para actualizar la variable keyData a un numero generado del Time.",
        },
        {
            id: "validator",
            type: "FenextjsValidatorClass",
            description: "Validador asignado a data.",
        },
        {
            id: "validatorData",
            type: "{ [id in keyof T]?: FenextjsValidatorClass<any> | undefined; }",
            description: "Validador asignado a cada elemento de data.",
        },
        {
            id: "validatorMemo",
            type: "FenextjsValidatorClass",
            description: "Validador asignado a dataMemo.",
        },
        {
            id: "validatorDataMemo",
            type: "{ [id in keyof T]?: FenextjsValidatorClass<any> | undefined; }",
            description: "Validador asignado a cada elemento de dataMemo.",
        },
        {
            id: "isValidData",
            type: "boolean | ErrorFenextjs",
            description: "Valor del resultado de validar data.",
        },
        {
            id: "isValidDataMemo",
            type: "boolean | ErrorFenextjs",
            description: "Valor del resultado de validar dataMemo.",
        },
        {
            id: "onValidateData",
            type: "function",
            description:
                "Funcion para ejecutar validator a data y guardar el resultado en isValidData.",
        },
        {
            id: "onValidateDataMemo",
            type: "function",
            description:
                "Funcion para ejecutar validatorMemo a dataMemo y guardar el resultado en isValidDataMemo.",
        },
        {
            id: "onSubmitData",
            type: "(optionsSubmitData: { data?: T; onSaveData?: (p: { data: T; result: RT }) => T; useValidator?: boolean; }) => void",
            description: "Función para enviar los datos.",
        },
        {
            id: "onSubmitDataMemo",
            type: "(optionsSubmitDataMemo: { dataMemo?: M; useValidatorMemo?: boolean; }) => void",
            description: "Función para enviar datos memorizados.",
        },
        {
            id: "loaderSubmit",
            type: "boolean",
            description:
                "Valor que determina si esta procesando el envio de data con onSubmitData.",
        },
        {
            id: "loaderSubmitMemo",
            type: "boolean",
            description:
                "Valor que determina si esta procesando el envio de dataMemo con onSubmitDataMemo.",
        },
        {
            id: "resultSubmitData",
            type: "RT",
            description: "Valor del resultado al ejecutar onSubmitData.",
        },
        {
            id: "resultSubmitDataMemo",
            type: "RM",
            description: "Valor del resultado al ejecutar onSubmitDataMemo.",
        },
        {
            id: "dataError",
            type: "ET",
            description:
                "Valor del error al ejecutar onSubmitData en caso que ocurra un error.",
        },
        {
            id: "dataErrorMemo",
            type: "EM",
            description:
                "Valor del error al ejecutar onSubmitDataMemo en caso que ocurra un error.",
        },
        {
            id: "setResultSubmitData",
            type: "Dispatch<SetStateAction<RT | undefined>>",
            description: "Funcion para modificar el valor de resultSubmitData.",
        },
        {
            id: "setResultSubmitDataMemo",
            type: "Dispatch<SetStateAction<RM | undefined>>",
            description:
                "Funcion para modificar el valor de resultSubmitDataMemo.",
        },

        {
            id: "setDataError",
            type: "Dispatch<SetStateAction<ET | undefined>>",
            description: "Funcion para modificar el valor de dataError.",
        },
        {
            id: "setDataErrorMemo",
            type: "Dispatch<SetStateAction<EM | undefined>>",
            description: "Funcion para modificar el valor de dataErrorMemo.",
        },
    ],
    useExample: [
        {
            text: "Ejecutar y Detectar acción",
            content: `const { setData } = useData({ 
    defaultData: initialData, 
    options: { onChangeDataAfter: console.log } 
})
setData(newValue)
`,
        },
        {
            text: "Definiendo interfaz",
            content: `const { setData } = useData<{ name: string }>({ defaultData: { name: "example" } });
setData({ name: "new name" })
`,
        },
        {
            text: "Usando para un formulario",
            content: `interface useFormLoginDataProps {
    email: string;
    password: string;
}
const {
    data,
    onChangeData,
    onSubmitData,
    dataError,
    loaderSubmit,
    isValidData,
    validatorData,
} = useData<
    useFormLoginDataProps,
    any,
    useFormLoginResultProps,
    any,
    ErrorFenextjs | undefined
>(
    { email: '', password: '' },
    {
        onSubmitData: (data)=>{
            //proceso de login
        },
        validator: FenextjsValidator<useFormLoginDataProps>()
            .setName('onLogin')
            .isObject({
                email: FenextjsValidator()
                    .isString('Email requerido')
                    .isEmail('Email invalido')
                    .isRequired('Email requerido',
                password: FenextjsValidator()
                    .isString('Contraseña requerido')
                    .isRequired('Contraseña es requerida')
                    .isMinOrEqual(6, 'La contraseña es muy corta'),
            }),
        onAfterSubmitDataOk: async ({ result }) => {
            console.log("Ingreso éxitoso")
        },
        onAfterSubmitDataError: ({ error }) => {
            console.log("Ocurrio un error", error)
        },
    },
);
<FormBase  onSubmit={onSubmitData}>
    <InputText
        id="email"
        placeholder={'Correo electrónico'}
        validator={validatorData?.email}
        onChange={onChangeData('email')}
        defaultValue={data.email}
        errorWithIsChange={true}
    />
    <InputPassword
        id="password"
        placeholder={'Contraseña'}
        validator={validatorData?.password}
        onChange={onChangeData('password')}
        defaultValue={data.password}
        errorWithIsChange={true}
    />
    {dataError && <ErrorComponent error={dataError} />}
    <Button
        disabled={isValidData !== true}
        loader={loaderSubmit}
        onClick={onSubmitData}
        full={true}
        size="extra-strong"
    >
        Entrar
    </Button>
</FormBase>
`,
        },

        {
            text: "Usando useGlobalContext",
            content: `const DATA1 = useData<string>(
    "",
    {
        useGlobalContext:"name-of-context-custom"
    },
);
const DATA2 = useData<string>(
    "",
    {
        useGlobalContext:"name-of-context-custom"
    },
);

<Title>DATA1 value = {DATA1.data}</Title>
<Title>DATA2 value = {DATA2.data}</Title>

<Button
    onClick={()=>{
        DATA1.setData("value1")
    }}
>
    setData1 to "value1"
</Button>
<Button
    onClick={()=>{
        DATA2.setData("value2")
    }}
>
    setData2 to "value2"
</Button>
`,
        },
    ],
};
