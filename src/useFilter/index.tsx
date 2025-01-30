import { useData } from "../useData";
import { SearchDataProps, DateDataProps } from "fenextjs-interface";

export type useFilterDataProps<CF extends Record<string, any>> =
    SearchDataProps & DateDataProps & Partial<CF>;

export interface useFilterProps<CF extends Record<string, any>> {
    name?: string;
    onChage?: (data: useFilterDataProps<CF>) => void;
}

export const useFilter = <CF extends Record<string, any> = any>({
    name,
    onChage,
}: useFilterProps<CF>) => {
    return useData<useFilterDataProps<CF>>(
        {},
        {
            useGlobalContext: `fenext-filter-${name ?? ""}`,
            onChangeDataAfter: onChage,
        },
    );
};
