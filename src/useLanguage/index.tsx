import { useCallback } from 'react'
import { useLocalStorage } from '../useLocalStorage'

export interface useLanguageProps<langs extends string[]> {
    defaultLang?: langs[number]
    langs: langs
    listTranductions: {
        [word: string]: {
            [lang in langs[number]]: any
        }
    }

    onNoFoundTranslate?: (data: {
        word: string,
        lang: langs[number]
    }) => void
}

export const useLanguage = <langs extends string[],>({ langs, listTranductions, defaultLang,onNoFoundTranslate, }: useLanguageProps<langs>) => {
    const { load, setLocalStorage: setCurrentLang, value: currentLang } = useLocalStorage<langs[number]>({
        name: "fenextjs-lang",
        defaultValue: defaultLang ?? langs?.[0],
    })

    const _t: (word?: any) => typeof word = useCallback(
        (word) => {
            if (word === '') {
                return '';
            }
            if (
                typeof word == 'string' &&
                currentLang &&
                typeof window != 'undefined'
            ) {
                let T = word.replaceAll('\\n', '').replaceAll('\n', '');
                while (T.includes('  ')) {
                    T = T.replaceAll('  ', ' ');
                }
                T = T.trim();
                if (T === '') {
                    return '';
                }
                const textTra = listTranductions?.[T]?.[currentLang];
                if (textTra) {
                    return textTra;
                } else {
                    onNoFoundTranslate?.({
                        lang : T,
                        word
                    })
                }
            }
            return word;
        },
        [currentLang, load,onNoFoundTranslate],
    )

    return {
        _t,
        setCurrentLang
    };
};
