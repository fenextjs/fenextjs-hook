import { useRouter } from "../useRouter";
export interface useHistoryProps {
    name?: string;
    useRouterCustom?: typeof useRouter;
}
export interface useHistoryOnBackProps {
    onValidateRuteBack?: (path: string) => boolean;
}
export declare const useHistory: ({ name, useRouterCustom, }: useHistoryProps) => {
    paths: string[] | undefined;
    onBack: ({ onValidateRuteBack }: useHistoryOnBackProps) => void;
    currentPath: string | undefined;
};
