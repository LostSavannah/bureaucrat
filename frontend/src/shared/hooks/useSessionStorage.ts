import { useState } from "react";

export default function useSessionStorage<T>(key:string, initialValue:T){

    function setValue(value:T){
        sessionStorage.setItem(key, JSON.stringify(value));
        return value;
    }
    
    function getFromSession(_:T){
        const valueString = sessionStorage.getItem(key);
        return valueString? JSON.parse(valueString) as T : setValue(initialValue);
    }

    const [stateValue, setStateValue] = useState(getFromSession(initialValue));

    function setStateAndSession(value:T){
        setValue(value);
        setStateValue(value);
    }

    return {value:stateValue, setValue:setStateAndSession};
}