import { PaginationDataProps } from "fenextjs-interface";
export interface usePaginationProps {
    name?: string;
    onChage?: (data: PaginationDataProps) => void;
}
export declare const usePagination: ({ name, onChage }: usePaginationProps) => {
    data: PaginationDataProps;
    setData: (nData: PaginationDataProps, optionsData?: import("../useData").setDataOptions | undefined) => void;
    onChangeData: (id: keyof PaginationDataProps) => (value: number | undefined, _options?: import("../useData").onChangeDataOptionsProps<PaginationDataProps> | undefined) => void;
    setDataFunction: (f: (p: PaginationDataProps) => PaginationDataProps, optionsData?: import("../useData").setDataOptions | undefined) => void;
};
