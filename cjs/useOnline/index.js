"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnline = void 0;
const react_1 = require("react");
const useOnline = ({} = {}) => {
    const [isOnline, setIsOnline] = (0, react_1.useState)(() => {
        // Fallback para entornos donde navigator.onLine no esté disponible.
        return typeof navigator !== "undefined" ? navigator.onLine : true;
    });
    const handleOnline = (0, react_1.useCallback)(() => setIsOnline(true), []);
    const handleOffline = (0, react_1.useCallback)(() => setIsOnline(false), []);
    (0, react_1.useEffect)(() => {
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
exports.useOnline = useOnline;
//# sourceMappingURL=index.js.map