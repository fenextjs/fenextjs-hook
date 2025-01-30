"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiError = void 0;
const useAction_1 = require("../useAction");
const useApiError = ({ onActionExecute }) => {
    const { onAction: onApiError } = (0, useAction_1.useAction)({
        name: "api-error",
        onActionExecute,
    });
    return { onApiError };
};
exports.useApiError = useApiError;
//# sourceMappingURL=index.js.map