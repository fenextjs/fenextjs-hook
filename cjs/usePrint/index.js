"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrintIframe = exports.usePrintData = void 0;
const react_1 = require("react");
const uselocalstoragenextjs_1 = require("uselocalstoragenextjs");
const usePrintData = ({ parse }) => {
    const { value, load } = (0, uselocalstoragenextjs_1.useLocalStorage)({
        name: "fenext-print",
        parse,
    });
    return {
        data: value,
        load,
    };
};
exports.usePrintData = usePrintData;
const usePrintIframe = ({ urlBase = "/print", url, data, delayForPrint = 1500, }) => {
    const [loader, setLoader] = (0, react_1.useState)(false);
    const { setLocalStorage } = (0, uselocalstoragenextjs_1.useLocalStorage)({
        name: "fenext-print",
    });
    const onPrint = () => {
        setLoader(true);
        setLocalStorage(data);
        let iframe = document.getElementById("fenext-print");
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
exports.usePrintIframe = usePrintIframe;
//# sourceMappingURL=index.js.map