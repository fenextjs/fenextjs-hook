"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDataLayer = void 0;
const useDataLayer = ({}) => {
    const push = ({ event, ...props }) => {
        const w = window;
        if (w?.dataLayer?.push) {
            w.dataLayer?.push?.({
                event,
                ...props,
            });
            return true;
        }
        return false;
    };
    return {
        push,
    };
};
exports.useDataLayer = useDataLayer;
//# sourceMappingURL=index.js.map