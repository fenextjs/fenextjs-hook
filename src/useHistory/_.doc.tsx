export default {
    id: "useHistory",
    name: "useHistory",
    description:
        "El hook `useHistory` gestiona un historial de rutas personalizadas utilizando `sessionStorage`. Proporciona funcionalidades para rastrear las rutas visitadas y retroceder a una ruta específica.",
    props: [
        {
            id: "name",
            type: "string",
            require: false,
            default: `"fenextjs-history"`,
            description:
                "Clave utilizada para almacenar el historial de rutas en el almacenamiento de sesión.",
        },
    ],
    returns: [
        {
            id: "paths",
            type: "string[] | undefined",
            description: "Lista de rutas almacenadas en el historial.",
        },
        {
            id: "currentPath",
            type: "string | undefined",
            description:
                "Ruta actual basada en el historial almacenado. Corresponde a la última ruta registrada.",
        },
        {
            id: "onBack",
            type: "(props: useHistoryOnBackProps) => void",
            description:
                "Función para retroceder a una ruta anterior en el historial.",
        },
    ],
    extras: [
        {
            id: "NOTA",
            title: "__NOTA__",
            description:
                "Para que useHistory funcione correctamente debe ser ejecutado en _app o el layout mas superior que se posea.",
            code: `import type { AppProps } from "next/app";
import { useHistory } from "fenextjs";

export default function App({ Component, pageProps }: AppProps) {
  useHistory({})
  return <Component {...pageProps} />
}`,
        },
    ],
    extrasReturns: [
        {
            id: "useHistoryOnBackProps",
            title: "useHistoryOnBackProps",
            description: "Propiedades para el uso de onBack:",
            tableItems: [
                {
                    Nombre: "onValidateRuteBack",
                    Requerido: "no",
                    Descripcion:
                        "Función para validar si la ruta de destino es valida para redireccionar.",
                },
            ],
        },
    ],
    useExample: [
        {
            text: "Inicializar el historial de rutas",
            content: `const { paths, currentPath } = useHistory();`,
        },
        {
            text: "Retroceder a una ruta previa",
            content: `const { onBack } = useHistory();
onBack({});`,
        },
        {
            text: "Retroceder a una ruta previa restringiendo la pagina '/restricted'",
            content: `const { onBack } = useHistory();
onBack({
    onValidateRuteBack: (path) => path !== "/restricted",
});`,
        },
    ],
};
