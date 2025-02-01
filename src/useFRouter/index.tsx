import { useEffect, useState } from 'react';

export const useFRouter = () => {
    const [location, setLocation] = useState({
        asPath: window.location.pathname,
        query: new URLSearchParams(window.location.search),
    });

    useEffect(() => {
        const handleLocationChange = () => {
            setLocation({
                asPath: window.location.pathname,
                query: new URLSearchParams(window.location.search),
            });
        };

        window.addEventListener('popstate', handleLocationChange); // Detecta cambios de historial
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);

    return {
        push: (url: string) => {
            window.location.href = url; // Redirigir a una nueva URL
        },
        replace: (url: string) => {
            window.location.replace(url); // Reemplazar la URL actual
        },
        ...location,
    };
}

