import { ThemeType } from "fenextjs-interface/cjs/Theme";
export interface useThemeProps {
}
export declare const useTheme: ({}: useThemeProps) => {
    theme: ThemeType | undefined;
    setTheme: (newValue: any) => void;
};
