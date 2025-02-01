import { useEffect, useState } from 'react';
import { env_log } from 'fenextjs-functions'
import { useFRouter } from '../useFRouter';


export const useRouter = () => {
    const [router, setRouter] = useState(null);

    useEffect(() => {
        try {
            import('next/router').then((module: any) => {
                setRouter(module?.useRouter);
            });
        } catch (e) {
            env_log('Next.js router no disponible, usando window.location como fallback');
        }
    }, []);

    return (router ?? useFRouter)()
};
