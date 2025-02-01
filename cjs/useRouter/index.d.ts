export interface useRouterProps {
    useNextRouter?: boolean;
}
export declare const useRouter: ({ useNextRouter }: useRouterProps) => {
    asPath: string;
    back: () => void;
    forward: () => void;
    isReady: boolean;
    pathname: string;
    push: (url: string) => void;
    query: {
        [k: string]: string;
    };
    reload: () => void;
    replace: (url: string) => void;
    route: string;
};
