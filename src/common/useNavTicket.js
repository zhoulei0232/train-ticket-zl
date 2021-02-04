import {
    useCallback
}  from 'react';
import {h0} from './fp';


export default  function useNavTicket(departDate,dispatch,prevDate,nextDate  ){
     
    const isPrevDisabled = false;
    const isNextDisabled = false;
 
    const prev = useCallback( ()=>{
        if(isPrevDisabled){
            return ;
        }
        dispatch(prevDate());
    },[isPrevDisabled])
    const next = useCallback( ()=>{
        if(isNextDisabled){
            return;
        }
        dispatch(nextDate());
    },[isNextDisabled])

    return{
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    }
}