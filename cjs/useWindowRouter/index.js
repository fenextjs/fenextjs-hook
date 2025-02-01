"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowRouter = void 0;
const react_1 = require("react");
const useWindowRouter = () => {
    const [pathname, setPathname] = (0, react_1.useState)(window.location.pathname);
    const [query, setQuery] = (0, react_1.useState)(new URLSearchParams(window.location.search));
    const [hash, setHash] = (0, react_1.useState)(window.location.hash);
    (0, react_1.useEffect)(() => {
        const handleLocationChange = () => {
            setPathname(window.location.pathname);
            setQuery(new URLSearchParams(window.location.search));
            setHash(window.location.hash);
        };
        window.addEventListener("popstate", handleLocationChange); // Cambios en el historial
        return () => {
            window.removeEventListener("popstate", handleLocationChange);
        };
    }, []);
    const push = (url) => {
        window.location.href = url;
        setPathname(window.location.pathname);
        setQuery(new URLSearchParams(window.location.search));
        setHash(window.location.hash);
    };
    const replace = (url) => {
        window.history.replaceState({}, "", url);
        setPathname(window.location.pathname);
        setQuery(new URLSearchParams(window.location.search));
        setHash(window.location.hash);
    };
    const back = () => {
        window.history.back();
    };
    const forward = () => {
        window.history.forward();
    };
    const reload = () => {
        window.location.reload();
    };
    return {
        asPath: pathname + (query.toString() ? `?${query.toString()}` : "") + hash,
        back,
        forward,
        isReady: true, // Siempre está listo en window.location
        pathname,
        push,
        query: Object.fromEntries(query.entries()),
        reload,
        replace,
        route: pathname,
    };
};
exports.useWindowRouter = useWindowRouter;
//# sourceMappingURL=index.js.map