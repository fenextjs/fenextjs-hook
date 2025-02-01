import { useEffect, useState } from "react";
import { env_log } from "fenextjs-functions";
import { useWindowRouter } from "../useWindowRouter";

export interface useRouterProps {
    useNextRouter?: boolean;
}

export const useRouter = ({ useNextRouter = true }: useRouterProps) => {
    const [router, setRouter] = useState(null);
    const windowRouter = useWindowRouter();
    useEffect(() => {
        if (
            useNextRouter &&
            process?.env?.["NEXT_PUBLIC_DISABLED_NEXT_ROUTER"] !== "TRUE"
        ) {
            try {
                import("next/router").then((module: any) => {
                    setRouter(module?.useRouter);
                });
            } catch (e) {
                env_log(
                    "Next.js router no disponible, usando window.location como fallback",
                );
            }
        }
    }, [useNextRouter]);

    return router ?? windowRouter;
};
