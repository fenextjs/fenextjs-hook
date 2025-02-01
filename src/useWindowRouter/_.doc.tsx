export default {
    "id": "useWindowRouter",
    "name": "useWindowRouter",
    "description": "El hook useWindowRouter es una implementación básica de un enrutador que utiliza la API de `window.location` para manejar la navegación en una aplicación web. Es útil en entornos donde no se dispone de un enrutador más avanzado, como Next.js.",
    "props": [],
    "returns": [
        {
            "id": "asPath",
            "type": "string",
            "description": "La ruta actual (pathname) de la URL."
        },
        {
            "id": "query",
            "type": "URLSearchParams",
            "description": "Un objeto `URLSearchParams` que contiene los parámetros de consulta de la URL."
        },
        {
            "id": "push",
            "type": "(url: string) => void",
            "description": "Redirige a una nueva URL."
        },
        {
            "id": "replace",
            "type": "(url: string) => void",
            "description": "Reemplaza la URL actual sin añadir una nueva entrada al historial del navegador."
        }
    ],
    "useExample": [
        {
            "text": "Navegar a una nueva URL",
            "content": `const { push } = useWindowRouter();
push('/nueva-ruta');`
        },
        {
            "text": "Reemplazar la URL actual",
            "content": `const { replace } = useWindowRouter();
replace('/otra-ruta');`
        }
    ]
}