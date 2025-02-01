export declare const useWindowRouter: () => {
    asPath: string;
    query: URLSearchParams;
    push: (url: string) => void;
    replace: (url: string) => void;
};
