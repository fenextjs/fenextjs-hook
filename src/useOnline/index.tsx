import { useEffect, useState, useCallback } from "react";

export interface useOnlineProps {
    onOnline?: () => void
    onOffline?: () => void
}

export const useOnline = ({ onOffline, onOnline }: useOnlineProps = {}) => {
    const [isOnline, setIsOnline] = useState<boolean>(() => {
        // Fallback para entornos donde navigator.onLine no esté disponible.
        return typeof navigator !== "undefined" ? navigator.onLine : true;
    });

    const handleOnline = useCallback(() => { setIsOnline(true); onOnline?.() }, [onOnline]);
    const handleOffline = useCallback(() => { setIsOnline(false); onOffline?.() }, [onOffline]);

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
