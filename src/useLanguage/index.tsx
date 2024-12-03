import { useCallback } from "react";
import { cleanTextForTranslate } from "fenextjs-functions";
import { useLocalStorage } from "../useLocalStorage";

export interface LanguageListProps<Langs extends string[]> {
    [word: string]: {
        [lang in Langs[number]]: any;
    };
}

export interface useLanguageProps<Langs extends string[]> {
    defaultLang?: Langs[number];
    langs: Langs;
    listTranductions: LanguageListProps<Langs>;
    onNoFoundTranslate?: (data: { word: string; lang: Langs[number] }) => void;

    fallbackNoFoundTranslation?: string;
}

export const useLanguage = <Langs extends string[]>({
    langs,
    listTranductions,
    defaultLang,
    onNoFoundTranslate,
    fallbackNoFoundTranslation = undefined,
}: useLanguageProps<Langs>) => {
    const { setLocalStorage: setCurrentLang, value: currentLang } =
        useLocalStorage<Langs[number]>({
            name: "fenextjs-lang",
            defaultValue: defaultLang ?? langs?.[0],
        });

    const onTranslate = useCallback(
        (word?: any) => {
            if (!word || word === "") return word;

            if (
                typeof word === "string" &&
                currentLang &&
                typeof window !== "undefined"
            ) {
                const cleanedWord = cleanTextForTranslate(word);

                if (cleanedWord === "") return "";

                const translation =
                    listTranductions?.[cleanedWord]?.[currentLang];
                if (translation) {
                    return translation;
                } else {
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
        },
        [
            currentLang,
            listTranductions,
            onNoFoundTranslate,
            fallbackNoFoundTranslation,
        ],
    );

    return {
        onTranslate,
        setCurrentLang,
    };
};
