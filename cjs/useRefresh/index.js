"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefresh = void 0;
const useData_1 = require("../useData");
const useRefresh = ({ ...props }) => {
    const { data, onConcatData } = (0, useData_1.useData)({}, {
        ...props,
        useGlobalContext: `useRefresh`,
    });
    const onRefresh = (ids) => {
        const obj = {};
        const time = new Date().getTime();
        [ids].flat(2).forEach((k) => {
            obj[`${k}`] = time;
        });
        onConcatData(obj);
    };
    return {
        data: data,
        onRefresh,
    };
};
exports.useRefresh = useRefresh;
//# sourceMappingURL=index.js.map