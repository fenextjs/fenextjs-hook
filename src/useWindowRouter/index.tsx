import { useEffect, useState } from "react";

export const useWindowRouter = () => {
    const [pathname, setPathname] = useState(window.location.pathname);
    const [query, setQuery] = useState(
        new URLSearchParams(window.location.search),
    );
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
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

    const push = (url: string) => {
        window.location.href = url;
        setPathname(window.location.pathname);
        setQuery(new URLSearchParams(window.location.search));
        setHash(window.location.hash);
    };

    const replace = (url: string) => {
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
        asPath:
            pathname + (query.toString() ? `?${query.toString()}` : "") + hash,
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
