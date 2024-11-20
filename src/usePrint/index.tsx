import { useState } from "react";
import { useLocalStorage, useLocalStorageProps } from "../useLocalStorage";

export interface usePrintDataProps
    extends Pick<useLocalStorageProps, "parse"> {}

export const usePrintData = <T,>({ parse }: usePrintDataProps) => {
    const { value, load } = useLocalStorage<T>({
        name: "fenext-print",
        parse,
    });
    return {
        data: value,
        load,
    };
};

export interface usePrintIframeProps<T> {
    urlBase?: string;
    url: string;
    data?: T;
    delayForPrint?: number;
}

export const usePrintIframe = <T,>({
    urlBase = "/print",
    url,
    data,
    delayForPrint = 1500,
}: usePrintIframeProps<T>) => {
    const [loader, setLoader] = useState(false);
    const { setLocalStorage } = useLocalStorage<T>({
        name: "fenext-print",
    });
    const onPrint = () => {
        setLoader(true);
        setLocalStorage(data);
        let iframe: HTMLIFrameElement | undefined = document.getElementById(
            "fenext-print",
        ) as HTMLIFrameElement;
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "fenext-print";
            document.body.appendChild(iframe);
            iframe.style.display = "none";
        }

        iframe.src = `${urlBase}${url}`;

        if (iframe.contentWindow) {
            iframe.contentWindow.onafterprint = () => {
                setLoader(false);
            };
        }
        iframe.onload = function () {
            setTimeout(function () {
                iframe?.focus();
                iframe?.contentWindow?.print();
            }, delayForPrint);
            if (iframe?.contentWindow) {
                iframe.contentWindow.onafterprint = () => {
                    setLoader(false);
                };
            }
        };
    };
    return {
        loader,
        onPrint,
    };
};
