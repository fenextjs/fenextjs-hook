import { useData } from "../useData";


export interface useRefreshData {
    [id : string]: number;
};

export interface useRefreshProps {}

export const useRefresh = ({ ...props }: useRefreshProps) => {
    const { data, onConcatData } = useData<useRefreshData>(
        {},
        {
            ...props,
            useGlobalContext: `useRefresh`,
        },
    );
    const onRefresh = (ids: string | string[]) => {
        const obj: useRefreshData = {};
        const time = new Date().getTime();
        [ids].flat(2).forEach((k) => {
            obj[`${k}`] = time;
        });
        onConcatData(obj);
    };
    return {
        data : data,
        onRefresh,
    };
};
