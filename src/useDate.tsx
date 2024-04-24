import { FenextjsDate, FenextjsDateProps } from "fenextjs-date";
import { useEffect, useState } from "react";

export interface useDateProps extends FenextjsDateProps{

}
export const useDate = ({...props}:useDateProps) => {
    const [dateValue, setDateValue] = useState<Date | undefined>(props.defaultDate);
    const [date, setDate] = useState(new FenextjsDate({
        ...props,
        onCallback:(a)=>{
            setDateValue(()=>new Date(a))
            props?.onCallback?.(a)
        }
    }));
    
    useEffect(() => {
        if(dateValue){
                setDate(new FenextjsDate({
                    ...props,
                    defaultDate:dateValue,
                    onCallback:(a)=>{
                        setDateValue(()=>new Date(a))
                        props?.onCallback?.(a)
                    }
                }))
        }
    }, [dateValue])
    

    return date
}