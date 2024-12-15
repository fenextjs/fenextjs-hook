import {useAction} from '../useAction'


export interface useActionDropDownProps  {
    name?:string
    onChange?:(e?:boolean)=>void
}
export const useActionDropDown = ({name,onChange}:useActionDropDownProps) => {
    const {onAction} = useAction<boolean>({
        name : `fenext-dropdown-${name ?? ''}`,
        onActionExecute:name!=undefined ? onChange : undefined
    })
    return {
        onClose : ()=> {onAction(false)},
        onActive : ()=> {onAction(true)},
        onToogle : ()=> {onAction()},
    }
}
