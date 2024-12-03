"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLanguage = void 0;
const react_1 = require("react");
const fenextjs_functions_1 = require("fenextjs-functions");
const useLocalStorage_1 = require("../useLocalStorage");
const useLanguage = ({ langs, listTranductions, defaultLang, onNoFoundTranslate, fallbackNoFoundTranslation = undefined, }) => {
    const { setLocalStorage: setCurrentLang, value: currentLang } = (0, useLocalStorage_1.useLocalStorage)({
        name: "fenextjs-lang",
        defaultValue: defaultLang ?? langs?.[0],
    });
    const onTranslate = (0, react_1.useCallback)((word) => {
        if (!word || word === "")
            return word;
        if (typeof word === "string" &&
            currentLang &&
            typeof window !== "undefined") {
            const cleanedWord = (0, fenextjs_functions_1.cleanTextForTranslate)(word);
            if (cleanedWord === "")
                return "";
            const translation = listTranductions?.[cleanedWord]?.[currentLang];
            if (translation) {
                return translation;
            }
            else {
                onNoFoundTranslate?.({
                    lang: currentLang,
                    word: cleanedWord,
                });
                if (fallbackNoFoundTranslation != undefined) {
                    return fallbackNoFoundTranslation;
                }
            }
        }
        return word;
    }, [
        currentLang,
        listTranductions,
        onNoFoundTranslate,
        fallbackNoFoundTranslation,
    ]);
    return {
        onTranslate,
        setCurrentLang,
    };
};
exports.useLanguage = useLanguage;
//# sourceMappingURL=index.js.map