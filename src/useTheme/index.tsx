import { useLocalStorage } from "../useLocalStorage";
import { ThemeType } from "fenextjs-interface/cjs/Theme";
import { useEffect } from "react";

export interface useThemeProps {}

export const useTheme = ({}: useThemeProps) => {
    const { setLocalStorage: setTheme, value: theme } =
        useLocalStorage<ThemeType>({
            name: "fenext-theme",
            defaultValue: "auto",
        });
    const onLoadThemeWindow = () => {
        if (!theme) {
            return;
        }
        if (typeof window == "undefined" || typeof document == "undefined") {
            setTimeout(onLoadThemeWindow, 500);
        } else {
            document.documentElement.setAttribute("fenext-theme", theme);
        }
    };
    useEffect(() => {
        onLoadThemeWindow();
    }, [theme]);

    return {
        theme,
        setTheme,
    };
};
