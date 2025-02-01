import { useRouterProps } from "../useRouter";
export interface useHistoryProps extends useRouterProps {
    name?: string;
}
export interface useHistoryOnBackProps {
    onValidateRuteBack?: (path: string) => boolean;
}
export declare const useHistory: ({ name, useNextRouter, }: useHistoryProps) => {
    paths: string[] | undefined;
    onBack: ({ onValidateRuteBack }: useHistoryOnBackProps) => void;
    currentPath: string | undefined;
};
