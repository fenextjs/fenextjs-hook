import { useData } from '../useData';
import { PaginationDataProps } from 'fenextjs-interface';

export interface usePaginationProps {
    name?: string
    onChage?: (data: PaginationDataProps) => void
}

export const usePagination = ({ name, onChage }: usePaginationProps) => {
    const { data, setData, onChangeData, setDataFunction } = useData<PaginationDataProps>({
        page:0,
        npage:10
    }, {
        useGlobalContext: `fenext-pagination-${name ?? ''}`,
        onChangeDataAfter: onChage
    })

    return { data, setData, onChangeData, setDataFunction }
}