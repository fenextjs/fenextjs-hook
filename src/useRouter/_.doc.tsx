export default  {
    "id": "useRouter",
    "name": "useRouter",
    "description": "El hook useRouter es una implementación que intenta utilizar el enrutador de Next.js si está disponible. Si no lo está, recurre a `useWindowRouter` como fallback.",
    "props": [],
    "returns": [
        {
            "id": "router",
            "type": "object",
            "description": "El enrutador de Next.js si está disponible, de lo contrario, el enrutador de `useWindowRouter`."
        }
    ],
    "useExample": [
        {
            "text": "Navegar a una nueva URL usando el enrutador de Next.js o el fallback",
            "content": `const router = useRouter();
router.push('/nueva-ruta');`
        }
    ],
    "extras": [
        {
            "id": "env_log",
            "title": "env_log",
            "description": "Función utilizada para registrar mensajes en la consola, especialmente útil para depuración.",
            "tableItems": [
                {
                    "Nombre": "env_log",
                    "Descripcion": "Registra mensajes en la consola cuando el enrutador de Next.js no está disponible.",
                    "Default": false
                }
            ]
        }
    ]
}