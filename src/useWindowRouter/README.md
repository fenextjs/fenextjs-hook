# useWindowRouter

El hook useWindowRouter es una implementación básica de un enrutador que utiliza la API de `window.location` para manejar la navegación en una aplicación web. Es útil en entornos donde no se dispone de un enrutador más avanzado, como Next.js.

### Importación

Para importar el componente useWindowRouter, se puede hacer desde fenextjs

```tsx copy
import { useWindowRouter } from "fenextjs";
```

### Returns

| Parametro | Tipo | Descripcion |
| --------- | ---- | ----------- |
| asPath | string  | La ruta actual (pathname) de la URL. |
| query | URLSearchParams  | Un objeto `URLSearchParams` que contiene los parámetros de consulta de la URL. |
| push | (url: string) =\> void  | Redirige a una nueva URL. |
| replace | (url: string) =\> void  | Reemplaza la URL actual sin añadir una nueva entrada al historial del navegador. |
### Usos

- Navegar a una nueva URL

```tsx copy
const { push } = useWindowRouter();
push('/nueva-ruta');
```

- Reemplazar la URL actual

```tsx copy
const { replace } = useWindowRouter();
replace('/otra-ruta');
```

