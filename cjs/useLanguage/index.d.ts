export interface LanguageListProps<Langs extends string[]> {
    [word: string]: {
        [lang in Langs[number]]: any;
    };
}
export interface useLanguageProps<Langs extends string[]> {
    defaultLang?: Langs[number];
    langs: Langs;
    listTranductions: LanguageListProps<Langs>;
    onNoFoundTranslate?: (data: {
        word: string;
        lang: Langs[number];
    }) => void;
}
export declare const useLanguage: <Langs extends string[]>({ langs, listTranductions, defaultLang, onNoFoundTranslate, }: useLanguageProps<Langs>) => {
    onTranslate: (word?: any) => any;
    setCurrentLang: (newValue: any) => void;
};
