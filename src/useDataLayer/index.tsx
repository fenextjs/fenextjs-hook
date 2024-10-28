export interface useDataLayerProps {}
export interface useDataLayerPushProps {
    event: string;
    value?: any;
    [id: string]: any;
}
export const useDataLayer = ({}: useDataLayerProps) => {
    const push = ({ event, ...props }: useDataLayerPushProps) => {
        const w: any = window;
        if (w?.dataLayer?.push) {
            w.dataLayer?.push?.({
                event,
                ...props,
            });
            return true;
        }
        return false;
    };

    return {
        push,
    };
};
