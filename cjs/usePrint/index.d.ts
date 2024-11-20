import { useLocalStorageProps } from "../useLocalStorage";
export interface usePrintDataProps extends Pick<useLocalStorageProps, "parse"> {
}
export declare const usePrintData: <T>({ parse }: usePrintDataProps) => {
    data: T | undefined;
    load: boolean;
};
export interface usePrintIframeProps<T> {
    urlBase?: string;
    url: string;
    data?: T;
    delayForPrint?: number;
}
export declare const usePrintIframe: <T>({ urlBase, url, data, delayForPrint, }: usePrintIframeProps<T>) => {
    loader: boolean;
    onPrint: () => void;
};
