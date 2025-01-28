"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = void 0;
const useData_1 = require("../useData");
const usePagination = ({ name, onChage }) => {
    const { data, setData, onChangeData, setDataFunction } = (0, useData_1.useData)({
        page: 0,
        npage: 10,
    }, {
        useGlobalContext: `fenext-pagination-${name ?? ""}`,
        onChangeDataAfter: onChage,
    });
    return { data, setData, onChangeData, setDataFunction };
};
exports.usePagination = usePagination;
//# sourceMappingURL=index.js.map