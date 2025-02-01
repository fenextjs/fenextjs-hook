export declare const useRouter: () => {
    asPath: string;
    query: URLSearchParams;
    push: (url: string) => void;
    replace: (url: string) => void;
};
