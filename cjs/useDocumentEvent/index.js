"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentEvent = void 0;
const react_1 = require("react");
const useDocumentEvent = ({ ...props }) => {
    const onLoad = () => {
        Object.keys(props).forEach((key) => {
            const listener = key;
            const fun = props[key];
            if (listener && fun) {
                document.addEventListener(listener, fun);
            }
        });
    };
    const onUnload = () => {
        Object.keys(props).forEach((key) => {
            const listener = key;
            const fun = props[key];
            if (listener && fun) {
                document.removeEventListener(listener, fun);
            }
        });
    };
    const onReload = () => {
        onUnload();
        onLoad();
    };
    (0, react_1.useEffect)(() => {
        onLoad();
        return () => {
            onUnload();
        };
    }, [props]);
    return {
        onReload,
    };
};
exports.useDocumentEvent = useDocumentEvent;
//# sourceMappingURL=index.js.map