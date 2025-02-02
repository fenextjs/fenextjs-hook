import { useEffect, useState } from "react";

export const useWindowRouter = () => {
    const _w = {
        location: {
            pathname: "",
            search: "",
            hash: "",
            href: "",
            reload: () => {},
        },
        history: {
            forward: () => {},
            back: () => {},
            replaceState: () => {},
        },
        addEventListener: () => {},
        removeEventListener: () => {},
    };

    const w = (typeof window == "undefined" ? _w : window) ?? _w;

    const [pathname, setPathname] = useState(w?.location?.pathname ?? "");
    const [query, setQuery] = useState(
        new URLSearchParams(w?.location?.search ?? ""),
    );
    const [hash, setHash] = useState(w?.location?.hash ?? "");

    useEffect(() => {
        const handleLocationChange = () => {
            setPathname(w?.location?.pathname ?? "");
            setQuery(new URLSearchParams(w?.location?.search ?? ""));
            setHash(w?.location?.hash ?? "");
        };

        w.addEventListener("popstate", handleLocationChange); // Cambios en el historial
        return () => {
            w.removeEventListener("popstate", handleLocationChange);
        };
    }, []);

    const push = (url: string) => {
        w.location.href = url;
        setPathname(w?.location?.pathname ?? "");
        setQuery(new URLSearchParams(w?.location?.search ?? ""));
        setHash(w?.location?.hash ?? "");
    };

    const replace = (url: string) => {
        w?.history?.replaceState({}, "", url);
        setPathname(w?.location?.pathname ?? "");
        setQuery(new URLSearchParams(w?.location?.search ?? ""));
        setHash(w?.location?.hash ?? "");
    };

    const back = () => {
        w?.history?.back();
    };

    const forward = () => {
        w?.history?.forward();
    };

    const reload = () => {
        w?.location?.reload();
    };

    return {
        asPath:
            pathname + (query.toString() ? `?${query.toString()}` : "") + hash,
        back,
        forward,
        isReady: true, // Siempre está listo en w.location
        pathname,
        push,
        query: Object.fromEntries(query.entries()),
        reload,
        replace,
        route: pathname,
    };
};
