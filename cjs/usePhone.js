"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePhone = void 0;
const react_1 = require("react");
const useData_1 = require("./useData");
/**
 * Hook for managing phone numbers.
 * @param defaultValue The initial value of the phone number.
 * @returns An object with functions and data for managing phone numbers.
 */
const usePhone = ({ defaultValue = {
    code: "",
    number: "",
}, }) => {
    const [load, setLoad] = (0, react_1.useState)(false);
    const [codes, setCodes] = (0, react_1.useState)([]);
    const { dataMemo: phone, onChangeData } = (0, useData_1.useData)(defaultValue, {
        onMemo: (data) => {
            return {
                ...data,
                tel: `${data.code} ${data.number}`,
            };
        },
    });
    /**
     * Loads the list of phone codes.
     */
    const loadPhones = async () => {
        const { phones } = await Promise.resolve().then(() => __importStar(require("world-phones")));
        setCodes(phones);
        setLoad(true);
        setCode(defaultValue.code);
    };
    (0, react_1.useEffect)(() => {
        loadPhones();
    }, []);
    /**
     * Sets the phone code.
     * @param code The phone code.
     */
    const setCode = (code) => {
        const codeSelect = codes.find((c) => c.code == code);
        onChangeData("code")(codeSelect?.code);
        onChangeData("img")(codeSelect?.img);
    };
    /**
     * Sets the phone number.
     * @param number The phone number.
     */
    const setNumber = (number) => {
        onChangeData("number")(number);
    };
    return {
        load,
        codes,
        phone,
        setCode,
        setNumber,
    };
};
exports.usePhone = usePhone;
//# sourceMappingURL=usePhone.js.map