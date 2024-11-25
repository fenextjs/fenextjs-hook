import { useEffect, useState, useCallback } from "react";

export interface useOnlineProps { }

export const useOnline = ({}: useOnlineProps = {}) => {
    const [isOnline, setIsOnline] = useState<boolean>(() => {
        // Fallback para entornos donde navigator.onLine no esté disponible.
        return typeof navigator !== "undefined" ? navigator.onLine : true;
    });

    const handleOnline = useCallback(() => setIsOnline(true), []);
    const handleOffline = useCallback(() => setIsOnline(false), []);

    useEffect(() => {
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            // Limpieza de eventos para evitar fugas de memoria
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [handleOnline, handleOffline]);

    return { isOnline };
};
