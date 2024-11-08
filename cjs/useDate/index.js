"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDate = void 0;
const fenextjs_date_1 = require("fenextjs-date");
const react_1 = require("react");
const useDate = ({ ...props }) => {
    const [dateValue, setDateValue] = (0, react_1.useState)(props.defaultDate);
    const [date, setDate] = (0, react_1.useState)(new fenextjs_date_1.FenextjsDate({
        ...props,
        onCallback: (a) => {
            setDateValue(() => new Date(a));
            props?.onCallback?.(a);
        },
    }));
    (0, react_1.useEffect)(() => {
        if (dateValue) {
            setDate(new fenextjs_date_1.FenextjsDate({
                ...props,
                defaultDate: dateValue,
                onCallback: (a) => {
                    setDateValue(() => new Date(a));
                    props?.onCallback?.(a);
                },
            }));
        }
    }, [dateValue]);
    return date;
};
exports.useDate = useDate;
//# sourceMappingURL=index.js.map