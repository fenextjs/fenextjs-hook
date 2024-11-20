"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
const useLocalStorage_1 = require("../useLocalStorage");
const react_1 = require("react");
const useTheme = ({}) => {
    const { setLocalStorage: setTheme, value: theme } = (0, useLocalStorage_1.useLocalStorage)({
        name: "fenext-theme",
        defaultValue: "auto",
    });
    const onLoadThemeWindow = () => {
        if (!theme) {
            return;
        }
        if (typeof window == "undefined" || typeof document == "undefined") {
            setTimeout(onLoadThemeWindow, 500);
        }
        else {
            document.documentElement.setAttribute("fenext-theme", theme);
        }
    };
    (0, react_1.useEffect)(() => {
        onLoadThemeWindow();
    }, [theme]);
    return {
        theme,
        setTheme,
    };
};
exports.useTheme = useTheme;
//# sourceMappingURL=index.js.map