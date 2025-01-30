"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilter = void 0;
const useData_1 = require("../useData");
const useFilter = ({ name, onChage, }) => {
    return (0, useData_1.useData)({}, {
        useGlobalContext: `fenext-filter-${name ?? ""}`,
        onChangeDataAfter: onChage,
    });
};
exports.useFilter = useFilter;
//# sourceMappingURL=index.js.map