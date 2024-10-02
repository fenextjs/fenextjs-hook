export interface useDataLayerProps {
}
export interface useDataLayerPushProps {
    event: string;
    value?: any;
    [id: string]: any;
}
export declare const useDataLayer: ({}: useDataLayerProps) => {
    push: ({ event, ...props }: useDataLayerPushProps) => boolean;
};
