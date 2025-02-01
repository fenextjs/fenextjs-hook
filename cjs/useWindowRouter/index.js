"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowRouter = void 0;
const react_1 = require("react");
const useWindowRouter = () => {
    const [location, setLocation] = (0, react_1.useState)({
        asPath: window.location.pathname,
        query: new URLSearchParams(window.location.search),
    });
    (0, react_1.useEffect)(() => {
        const handleLocationChange = () => {
            setLocation({
                asPath: window.location.pathname,
                query: new URLSearchParams(window.location.search),
            });
        };
        window.addEventListener("popstate", handleLocationChange); // Detecta cambios de historial
        return () => {
            window.removeEventListener("popstate", handleLocationChange);
        };
    }, []);
    return {
        push: (url) => {
            window.location.href = url; // Redirigir a una nueva URL
        },
        replace: (url) => {
            window.location.replace(url); // Reemplazar la URL actual
        },
        ...location,
    };
};
exports.useWindowRouter = useWindowRouter;
//# sourceMappingURL=index.js.map