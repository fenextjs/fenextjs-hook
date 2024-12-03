"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLanguage = void 0;
const react_1 = require("react");
const useLocalStorage_1 = require("../useLocalStorage");
const useLanguage = ({ langs, listTranductions, defaultLang, onNoFoundTranslate, }) => {
    const { setLocalStorage: setCurrentLang, value: currentLang } = (0, useLocalStorage_1.useLocalStorage)({
        name: "fenextjs-lang",
        defaultValue: defaultLang ?? langs?.[0],
    });
    // Helper function to clean the input text
    const cleanText = (0, react_1.useCallback)((text) => {
        return text
            .replaceAll("\\n", "")
            .replaceAll("\n", "")
            .replace(/ {2,}/g, " ")
            .trim();
    }, []);
    const onTranslate = (0, react_1.useCallback)((word) => {
        if (!word || word === "")
            return word;
        if (typeof word === "string" &&
            currentLang &&
            typeof window !== "undefined") {
            const cleanedWord = cleanText(word);
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
            }
        }
        return word;
    }, [currentLang, listTranductions, onNoFoundTranslate, cleanText]);
    return {
        onTranslate,
        setCurrentLang,
    };
};
exports.useLanguage = useLanguage;
//# sourceMappingURL=index.js.map