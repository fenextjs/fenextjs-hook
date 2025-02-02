import { useRouter, useRouterProps } from "../useRouter";
export interface useHistoryProps extends useRouterProps {
    name?: string;
    useRouterCustom?: typeof useRouter;
}
export interface useHistoryOnBackProps {
    onValidateRuteBack?: (path: string) => boolean;
}
export declare const useHistory: ({ name, useNextRouter, useRouterCustom, }: useHistoryProps) => {
    paths: string[] | undefined;
    onBack: ({ onValidateRuteBack }: useHistoryOnBackProps) => void;
    currentPath: string | undefined;
};
