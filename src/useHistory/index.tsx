import { useSessionStorage } from "../useSessionStorage";
import { useRouter } from "../useRouter";
import { useCallback, useEffect, useMemo } from "react";

export interface useHistoryProps {
    name?: string;
}
export interface useHistoryOnBackProps {
    onValidateRuteBack?: (path: string) => boolean;
}

export const useHistory = ({ name = "fenextjs-history" }: useHistoryProps) => {
    const {
        setSessionStorage,
        value: paths,
        load,
    } = useSessionStorage<string[]>({
        name,
        parse: (e) => {
            try {
                return JSON.parse(e);
            } catch {
                return [];
            }
        },
    });

    const onPushPath = useCallback(
        (n: string) => {
            if (paths?.at(-1) === n) {
                return;
            }
            setSessionStorage([...(paths ?? []), ...[n].flat(2)]);
        },
        [paths],
    );

    const router = useRouter();
    useEffect(() => {
        if (load && !router.asPath.includes("[")) {
            onPushPath(router.asPath);
        }
    }, [router.asPath, load]);

    const currentPath = useMemo(() => [paths ?? []].flat(2).at(-1), [paths]);

    const onBack = useCallback(
        ({ onValidateRuteBack }: useHistoryOnBackProps) => {
            let listPaths = [...(paths ?? [])];
            let nSlice = 1;
            let pathBack = listPaths.at(-nSlice) ?? "";

            const onBackPath = () => {
                nSlice++;
                pathBack = listPaths.at(-nSlice) ?? "";
                if (pathBack == currentPath) {
                    onBackPath();
                    return;
                }
                if (pathBack == "") {
                    pathBack = listPaths[0] ?? "";
                }
            };
            do {
                onBackPath();
            } while (
                onValidateRuteBack != undefined &&
                !onValidateRuteBack(pathBack)
            );

            listPaths = listPaths.slice(
                0,
                Math.max(listPaths.length - nSlice, 1),
            );

            setSessionStorage(listPaths);
            router.push(pathBack);
        },
        [paths, currentPath],
    );

    return {
        paths,
        onBack,
        currentPath,
    };
};
