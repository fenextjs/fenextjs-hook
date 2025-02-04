export interface useRefreshData {
    [id: string]: number;
}
export interface useRefreshProps {
}
export declare const useRefresh: ({ ...props }: useRefreshProps) => {
    data: useRefreshData;
    onRefresh: (ids: string | string[]) => void;
};
