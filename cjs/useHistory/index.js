"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHistory = void 0;
const useSessionStorage_1 = require("../useSessionStorage");
const useRouter_1 = require("../useRouter");
const react_1 = require("react");
const useHistory = ({ name = "fenextjs-history", useNextRouter, }) => {
    const { setSessionStorage, value: paths, load, } = (0, useSessionStorage_1.useSessionStorage)({
        name,
        parse: (e) => {
            try {
                return JSON.parse(e);
            }
            catch {
                return [];
            }
        },
    });
    const onPushPath = (0, react_1.useCallback)((n) => {
        if (paths?.at(-1) === n) {
            return;
        }
        setSessionStorage([...(paths ?? []), ...[n].flat(2)]);
    }, [paths]);
    const router = (0, useRouter_1.useRouter)({ useNextRouter });
    (0, react_1.useEffect)(() => {
        if (load && !router.asPath.includes("[")) {
            onPushPath(router.asPath);
        }
    }, [router.asPath, load]);
    const currentPath = (0, react_1.useMemo)(() => [paths ?? []].flat(2).at(-1), [paths]);
    const onBack = (0, react_1.useCallback)(({ onValidateRuteBack }) => {
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
        } while (onValidateRuteBack != undefined &&
            !onValidateRuteBack(pathBack));
        listPaths = listPaths.slice(0, Math.max(listPaths.length - nSlice, 1));
        setSessionStorage(listPaths);
        router.push(pathBack);
    }, [paths, currentPath]);
    return {
        paths,
        onBack,
        currentPath,
    };
};
exports.useHistory = useHistory;
//# sourceMappingURL=index.js.map